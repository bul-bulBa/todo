import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TokenModule } from './token/token.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
  imports: [TokenModule]
})
export class AuthModule {}
