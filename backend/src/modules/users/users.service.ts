import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { UserRecord, UserResponse } from './user.types';

type GoogleProfileInput = {
  googleId: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
};

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit(): Promise<void> {
    await this.databaseService.query(`
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
    `);
  }

  async upsertGoogleUser(input: GoogleProfileInput): Promise<UserRecord> {
    const { rows } = await this.databaseService.query<UserRecord>(
      `
        INSERT INTO users (google_id, email, full_name, avatar_url, updated_at)
        VALUES ($1, $2, $3, $4, NOW())
        ON CONFLICT (google_id)
        DO UPDATE SET
          email = EXCLUDED.email,
          full_name = EXCLUDED.full_name,
          avatar_url = EXCLUDED.avatar_url,
          updated_at = NOW()
        RETURNING *;
      `,
      [input.googleId, input.email, input.fullName, input.avatarUrl],
    );

    return rows[0];
  }

  async findById(id: number): Promise<UserRecord | null> {
    const { rows } = await this.databaseService.query<UserRecord>(
      `
        SELECT *
        FROM users
        WHERE id = $1
          AND deleted_at IS NULL
        LIMIT 1;
      `,
      [id],
    );

    return rows[0] ?? null;
  }

  toResponse(user: UserRecord): UserResponse {
    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      role: user.role,
      ui_language: user.ui_language,
      default_resume_language: user.default_resume_language,
    };
  }
}

