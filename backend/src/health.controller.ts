import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './config/database.config';
import { LocalStorageService } from './storage/local-storage.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  @Get()
  getHealth() {
    const postgres = getPostgresConfig(this.configService);
    return {
      status: 'ok',
      app: 'resume-builder-backend',
      nodeEnv: this.configService.get<string>('NODE_ENV', 'development'),
      authMode: this.configService.get<string>('AUTH_MODE', 'local'),
      postgres: {
        host: postgres.host,
        port: postgres.port,
        database: postgres.database,
      },
      localStorageRoot: this.localStorageService.getRootPath(),
    };
  }
}
