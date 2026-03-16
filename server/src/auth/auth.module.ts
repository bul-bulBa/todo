import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TokenModule } from './token/token.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { TwoFactorModule } from './two-factor/two-factor.module';
import { ProviderModule } from './provider/provider.module';
import { getProvidersConfig } from 'src/config/providers.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { getRecaptchaConfig } from 'src/config/recaptcha.confing';

@Module({
  imports: [
    ProviderModule.registerAsync({
      imports: [
        ConfigModule
      ],
      useFactory: getProvidersConfig,
      inject: [ConfigService]
    }),
      
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getRecaptchaConfig,
      inject: [ConfigService]
    }),
    forwardRef(() => EmailConfirmationModule),
    TokenModule, EmailConfirmationModule, TwoFactorModule, ResetPasswordModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule { }
