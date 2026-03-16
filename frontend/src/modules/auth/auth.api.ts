import { apiRequest } from '@/lib/api';
import { AuthModeResponse, LoginResponse, User } from './auth.types';

export async function getAuthMode(): Promise<AuthModeResponse> {
  return apiRequest<AuthModeResponse>('/auth/mode');
}

export async function localLogin(email?: string): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/auth/local-login', {
    method: 'POST',
    body: email ? { email } : {},
  });
}

export async function getMe(token: string): Promise<User> {
  return apiRequest<User>('/auth/me', { token });
}

export async function logout(token: string): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>('/auth/logout', {
    method: 'POST',
    token,
  });
}

