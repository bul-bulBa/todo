import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { setCookieToken } from 'src/libs/interceptors/setCookieToken.interceptor';
import type { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseInterceptors(setCookieToken)
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request
  ) {
    return this.authService.register(dto, req)
  }

  @UseInterceptors(setCookieToken)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request
  ) {
    return this.authService.login(dto, req)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res() res: Response
  ) {
    return this.authService.logout(req, res)
  }
}
