import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
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

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.oauthClient = new OAuth2Client(this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID'));
  }

  async signInWithGoogle(idToken: string): Promise<AuthSuccessResponse> {
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
