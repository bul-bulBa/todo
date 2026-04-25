import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { MailService } from '@/libs/mail/mail.service';
import { UserService } from '@/user/user.service';

@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService, MailService, UserService],
})
export class ResetPasswordModule {}
