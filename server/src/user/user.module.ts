import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '@/auth/token/token.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ConfigService, TokenService],
})
export class UserModule {}
