import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { UserResponse } from '../users/user.types';

type AuthSuccessResponse = {
  accessToken: string;
  user: UserResponse;
};

type AuthTokenPayload = {
  sub: number;
  email: string;
  role: string;
};

function isAuthTokenPayload(value: unknown): value is AuthTokenPayload {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const payload = value as Record<string, unknown>;
  return (
    typeof payload.sub === 'number' &&
    typeof payload.email === 'string' &&
    typeof payload.role === 'string'
  );
}

@Injectable()
export class AuthService {
  private readonly oauthClient: OAuth2Client;
  private readonly authMode: 'local' | 'google';

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.oauthClient = new OAuth2Client(this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID'));
    this.authMode = this.configService.get<'local' | 'google'>('AUTH_MODE', 'local');
  }

  async signInWithGoogle(idToken: string): Promise<AuthSuccessResponse> {
    if (this.authMode !== 'google') {
      throw new BadRequestException('Google login is disabled. Set AUTH_MODE=google.');
    }

    const ticket = await this.oauthClient.verifyIdToken({
      idToken,
      audience: this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
    });

    const payload = ticket.getPayload();
    if (!payload?.sub || !payload.email) {
      throw new UnauthorizedException('Invalid Google token payload.');
    }

    const user = await this.usersService.upsertGoogleUser({
      googleId: payload.sub,
      email: payload.email,
      fullName: payload.name ?? payload.email,
      avatarUrl: payload.picture ?? null,
    });

    const responseUser = this.usersService.toResponse(user);
    return this.issueToken(responseUser);
  }

  async signInLocal(email?: string): Promise<AuthSuccessResponse> {
    if (this.authMode !== 'local') {
      throw new BadRequestException('Local login is disabled. Set AUTH_MODE=local.');
    }

    const targetEmail = email ?? this.configService.getOrThrow<string>('LOCAL_DEMO_EMAIL');
    const user = await this.usersService.findByEmail(targetEmail);
    if (!user) {
      throw new UnauthorizedException(
        `Demo user not found for ${targetEmail}. Run database migrations first.`,
      );
    }

    return this.issueToken(this.usersService.toResponse(user));
  }

  getAuthMode() {
    return { auth_mode: this.authMode };
  }

  private issueToken(responseUser: UserResponse): AuthSuccessResponse {
    const accessToken = jwt.sign(
      {
        sub: responseUser.id,
        email: responseUser.email,
        role: responseUser.role,
      },
      this.configService.getOrThrow<string>('JWT_SECRET'),
      { expiresIn: '7d' },
    );

    return { accessToken, user: responseUser };
  }

  verifyAccessToken(token: string): AuthTokenPayload {
    try {
      const payload = jwt.verify(token, this.configService.getOrThrow<string>('JWT_SECRET'));
      if (!isAuthTokenPayload(payload)) {
        throw new UnauthorizedException('Invalid access token payload.');
      }
      return payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token.');
    }
  }
}
