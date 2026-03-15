import { Body, Controller, Param, Post } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';

@Controller('auth/reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('reset')
  async reset(@Body() dto: ResetPasswordDto) {
    return this.resetPasswordService.reset(dto)
  }

  @Post('new/:token')
  async new(
    @Body() dto: NewPasswordDto,
    @Param('token') token: string
  ) {
    return this.resetPasswordService.new(dto, token)
  }
}
