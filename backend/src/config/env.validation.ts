type EnvInput = Record<string, unknown>;

function requireString(input: EnvInput, key: string): string {
  const value = input[key];
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Environment variable ${key} is required.`);
  }
  return value;
}

function requirePort(input: EnvInput, key: string, fallback?: number): number {
  const raw = input[key];
  if (raw === undefined || raw === null || raw === '') {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Environment variable ${key} is required.`);
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Environment variable ${key} must be a positive integer.`);
  }
  return parsed;
}

export type ValidatedEnv = {
  NODE_ENV: string;
  PORT: number;
  AUTH_MODE: 'local' | 'google';
  DATABASE_URL: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  GOOGLE_CLIENT_ID: string;
  JWT_SECRET: string;
  LOCAL_DEMO_EMAIL: string;
  LOCAL_STORAGE_ROOT: string;
};

export function validateEnv(config: EnvInput): ValidatedEnv {
  const authModeRaw = (config.AUTH_MODE as string) || 'local';
  if (authModeRaw !== 'local' && authModeRaw !== 'google') {
    throw new Error('Environment variable AUTH_MODE must be "local" or "google".');
  }

  return {
    NODE_ENV: (config.NODE_ENV as string) || 'development',
    PORT: requirePort(config, 'PORT', 4000),
    AUTH_MODE: authModeRaw,
    DATABASE_URL: requireString(config, 'DATABASE_URL'),
    DB_HOST: requireString(config, 'DB_HOST'),
    DB_PORT: requirePort(config, 'DB_PORT', 5432),
    DB_NAME: requireString(config, 'DB_NAME'),
    DB_USER: requireString(config, 'DB_USER'),
    DB_PASSWORD: requireString(config, 'DB_PASSWORD'),
    GOOGLE_CLIENT_ID: requireString(config, 'GOOGLE_CLIENT_ID'),
    JWT_SECRET: requireString(config, 'JWT_SECRET'),
    LOCAL_DEMO_EMAIL: (config.LOCAL_DEMO_EMAIL as string) || 'demo@example.com',
    LOCAL_STORAGE_ROOT: (config.LOCAL_STORAGE_ROOT as string) || './local-storage',
  };
}
