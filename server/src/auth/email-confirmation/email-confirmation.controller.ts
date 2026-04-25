import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import type { Request } from 'express';
import { EmailConfirmationDto } from './dto/confirmation-email.dto';
import { setCookieToken } from '@/libs/interceptors/setCookieToken.interceptor';

@Controller('auth/email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @UseInterceptors(setCookieToken)
  @Post()
  async newVerification(
    @Req() req: Request,
    @Body() dto: EmailConfirmationDto
  ) {
    return this.emailConfirmationService.newVerification(req, dto)
  }
}
