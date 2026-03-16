CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  google_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  ui_language TEXT NOT NULL DEFAULT 'en',
  default_resume_language TEXT NOT NULL DEFAULT 'en',
  default_template_id BIGINT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ NULL
);

INSERT INTO users (google_id, email, full_name, avatar_url, role, ui_language, default_resume_language)
VALUES (
  'local-demo-user',
  'demo@example.com',
  'Demo User',
  NULL,
  'user',
  'en',
  'en'
)
ON CONFLICT (email) DO NOTHING;

