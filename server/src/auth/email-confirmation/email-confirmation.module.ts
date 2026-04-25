import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import { MailModule } from '@/libs/mail/mail.module';
import { TokenModule } from '../token/token.module';
import { UserModule } from '@/user/user.module';
import { UserService } from '@/user/user.service';

@Module({
  imports: [MailModule, TokenModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, UserService],
  exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}
