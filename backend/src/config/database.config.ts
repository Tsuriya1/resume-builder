import { ConfigService } from '@nestjs/config';

export type PostgresConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  url: string;
};

export function getPostgresConfig(configService: ConfigService): PostgresConfig {
  return {
    host: configService.getOrThrow<string>('DB_HOST'),
    port: configService.getOrThrow<number>('DB_PORT'),
    database: configService.getOrThrow<string>('DB_NAME'),
    username: configService.getOrThrow<string>('DB_USER'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    url: configService.getOrThrow<string>('DATABASE_URL'),
  };
}

