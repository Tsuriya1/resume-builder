import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdir } from 'node:fs/promises';
import { isAbsolute, resolve } from 'node:path';

@Injectable()
export class LocalStorageService implements OnModuleInit {
  private rootPath = '';

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const configuredRoot = this.configService.getOrThrow<string>('LOCAL_STORAGE_ROOT');
    this.rootPath = isAbsolute(configuredRoot)
      ? configuredRoot
      : resolve(process.cwd(), configuredRoot);
    await mkdir(this.rootPath, { recursive: true });
  }

  getRootPath(): string {
    return this.rootPath;
  }
}

