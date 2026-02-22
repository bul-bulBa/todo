import { Module } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { MailModule } from 'src/libs/mail/mail.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [MailModule, TokenModule],
  providers: [TwoFactorService],
  exports: [TwoFactorService]
})
export class TwoFactorModule {}
