import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './config/database.config';

@Controller('health')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHealth() {
    const postgres = getPostgresConfig(this.configService);
    return {
      status: 'ok',
      app: 'resume-builder-backend',
      nodeEnv: this.configService.get<string>('NODE_ENV', 'development'),
      postgres: {
        host: postgres.host,
        port: postgres.port,
        database: postgres.database,
      },
    };
  }
}

