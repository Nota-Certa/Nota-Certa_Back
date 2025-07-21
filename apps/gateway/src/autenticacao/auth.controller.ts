import { Controller, Post, Body,  Get, Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

  @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Request() req) {
    return req.user;
}
}

