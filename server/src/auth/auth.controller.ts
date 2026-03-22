import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { setCookieToken } from 'src/libs/interceptors/setCookieToken.interceptor';
import type { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { Authorized } from './decorators/authorized.decorator';
import { Authorization } from './decorators/auth.decorator';
import { ProviderService } from './provider/provider.service';
import { AuthProviderGuard } from './guards/provider.guard';
import { ConfigService } from '@nestjs/config';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { IS_DEV_ENV } from 'src/libs/utils/is-dev.util';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly providerService: ProviderService,
    private readonly configService: ConfigService
  ) { }

  @Recaptcha()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request
  ) {
    return this.authService.register(dto, req)
  }

  @Recaptcha()
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

  @UseInterceptors(setCookieToken)
  @Post('refresh')
  async refresh(
    @Req() req: Request
  ) {
    return this.authService.refresh(req)
  }

  @Authorization()
  @Get('me')
  async me(
    @Authorized('id') id: string,
    @Req() req
  ) {
    return req.user.email
  }

  @Get('oauth/connect/:provider')
  async connect(@Param('provider') provider: string) {
    const providerInstance = this.providerService.findByService(provider)

    return {
      url: providerInstance?.getAuthUrl()
    }
  }

  @Get('/oauth/callback/:provider')
  @UseGuards(AuthProviderGuard)
  async callback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
    @Param('provider') provider: string
  ) {
    if (!code) throw new BadRequestException(`authorization code not received`)

    const { accessToken, refreshToken } = await this.authService.extractProfileFromCode(req, provider, code)

    // because I have redirect and can't return data, I do this shit
    res.cookie('accessToken', accessToken,
      { maxAge: 30 * 60 * 1000, httpOnly: true, secure: !IS_DEV_ENV, sameSite: 'lax' })
    res.cookie('refreshToken', refreshToken,
      { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: !IS_DEV_ENV, sameSite: 'lax' })

    return res.redirect(`${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/todo`)
  }
}
