import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from './current-user.decorator';
import { GoogleAuthDto } from './dto/google-auth.dto';
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

