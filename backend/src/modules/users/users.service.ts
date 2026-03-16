import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { UserRecord, UserResponse } from './user.types';

type GoogleProfileInput = {
  googleId: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
};

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  async findByEmail(email: string): Promise<UserRecord | null> {
    const { rows } = await this.databaseService.query<UserRecord>(
      `
        SELECT *
        FROM users
        WHERE email = $1
          AND deleted_at IS NULL
        LIMIT 1;
      `,
      [email],
    );

    return rows[0] ?? null;
  }

  toResponse(user: UserRecord): UserResponse {
    return {
      id: Number(user.id),
      email: user.email,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      role: user.role,
      ui_language: user.ui_language,
      default_resume_language: user.default_resume_language,
    };
  }
}
