import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Authorization } from 'src/auth/decorators/auth.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Authorization()
  get( @Authorized('id') id: string ) {
    this.todoService.get(id)
  }
}
