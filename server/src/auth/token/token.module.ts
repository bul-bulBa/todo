import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { UserModule } from '@/user/user.module';
import { UserService } from '@/user/user.service';

@Module({
  providers: [TokenService, UserService],
  exports: [TokenService]
})
export class TokenModule {}
