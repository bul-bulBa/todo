import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Authorization } from 'src/auth/decorators/auth.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { createTodoDto } from './dto/create_todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Authorization()
  get( @Authorized('id') id: string ) {
    return this.todoService.get(id)
  }

  @Post()
  @Authorization()
  create(
    @Authorized('id') id: string,
    @Body() { text }: createTodoDto
  ) {
    return this.todoService.create(id, text)
  }
}
