import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from './auth.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = header.slice('Bearer '.length).trim();
    if (!token) {
      next();
      return;
    }

    try {
      const payload = this.authService.verifyAccessToken(token);
      const user = await this.usersService.findById(payload.sub);
      if (user) {
        req.user = this.usersService.toResponse(user);
      }
    } catch {
      // Ignore invalid token at middleware layer; protected routes enforce auth via guard.
    }

    next();
  }
}

