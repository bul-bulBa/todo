import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [TokenService, UserService],
  exports: [TokenService]
})
export class TokenModule {}
