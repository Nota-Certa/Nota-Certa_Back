import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto);
    return {
      message: 'Login realizado',
      access_token: token.access_token,
    };
  }

  @Post('logout')
  logout() {
    return { message: 'Logout realizado.' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }
}
