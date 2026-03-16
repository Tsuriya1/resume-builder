import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserResponse } from '../users/user.types';
import { AuthenticatedRequest } from './auth.types';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserResponse => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user as UserResponse;
  },
);

