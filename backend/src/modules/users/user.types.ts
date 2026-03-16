export type UserRecord = {
  id: number | string;
  google_id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: 'user' | 'admin';
  ui_language: string;
  default_resume_language: string;
  default_template_id: number | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type UserResponse = {
  id: number;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: 'user' | 'admin';
  ui_language: string;
  default_resume_language: string;
};
