import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './auth/token/token.module';
import { MailModule } from './libs/mail/mail.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    TokenModule,
    MailModule,
    TodoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
