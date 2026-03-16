import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LocalLoginDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
}

