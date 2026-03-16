import { Request } from 'express';
import { UserResponse } from '../users/user.types';

export type AuthenticatedRequest = Request & {
  user?: UserResponse;
};

