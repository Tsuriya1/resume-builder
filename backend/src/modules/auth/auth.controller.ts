import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from './current-user.decorator';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { LocalLoginDto } from './dto/local-login.dto';
import { RequireAuthGuard } from './require-auth.guard';
import { AuthService } from './auth.service';
import { UserResponse } from '../users/user.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async googleAuth(@Body() payload: GoogleAuthDto) {
    return this.authService.signInWithGoogle(payload.idToken);
  }

  @Post('local-login')
  async localLogin(@Body() payload: LocalLoginDto) {
    return this.authService.signInLocal(payload.email);
  }

  @Get('mode')
  getAuthMode() {
    return this.authService.getAuthMode();
  }

  @Get('me')
  @UseGuards(RequireAuthGuard)
  getMe(@CurrentUser() user: UserResponse) {
    return user;
  }

  @Post('logout')
  @UseGuards(RequireAuthGuard)
  logout() {
    return { success: true };
  }
}
