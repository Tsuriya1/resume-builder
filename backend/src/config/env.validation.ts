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
  DATABASE_URL: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  GOOGLE_CLIENT_ID: string;
  JWT_SECRET: string;
};

export function validateEnv(config: EnvInput): ValidatedEnv {
  return {
    NODE_ENV: (config.NODE_ENV as string) || 'development',
    PORT: requirePort(config, 'PORT', 4000),
    DATABASE_URL: requireString(config, 'DATABASE_URL'),
    DB_HOST: requireString(config, 'DB_HOST'),
    DB_PORT: requirePort(config, 'DB_PORT', 5432),
    DB_NAME: requireString(config, 'DB_NAME'),
    DB_USER: requireString(config, 'DB_USER'),
    DB_PASSWORD: requireString(config, 'DB_PASSWORD'),
    GOOGLE_CLIENT_ID: requireString(config, 'GOOGLE_CLIENT_ID'),
    JWT_SECRET: requireString(config, 'JWT_SECRET'),
  };
}
