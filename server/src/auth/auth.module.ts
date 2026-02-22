import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TokenModule } from './token/token.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { TwoFactorModule } from './two-factor/two-factor.module';

@Module({
  imports: [TokenModule, EmailConfirmationModule, TwoFactorModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
