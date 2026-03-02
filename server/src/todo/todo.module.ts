import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { UserService } from 'src/user/user.service';
import { TokenModule } from 'src/auth/token/token.module';

@Module({
  imports: [TokenModule],
  controllers: [TodoController],
  providers: [TodoService, UserService],
  exports: [TodoService]
})
export class TodoModule {}
