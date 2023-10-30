import { Controller, Post, Req, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any, @Response({ passthrough: true }) res) {
    const body = await this.authService.login(req.user);
    res.set('Authorization', body.token);
    return body;
  }
}
