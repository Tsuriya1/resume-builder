export type AuthModeResponse = {
  auth_mode: 'local' | 'google';
};

export type User = {
  id: number;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: 'user' | 'admin';
  ui_language: string;
  default_resume_language: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

