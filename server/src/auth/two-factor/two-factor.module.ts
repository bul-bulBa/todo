import { Module } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { MailModule } from '@/libs/mail/mail.module';
import { TokenModule } from '../token/token.module';
import { UserModule } from '@/user/user.module';
import { UserService } from '@/user/user.service';

@Module({
  imports: [MailModule, TokenModule],
  providers: [TwoFactorService, UserService],
  exports: [TwoFactorService]
})
export class TwoFactorModule {}
