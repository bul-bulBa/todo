import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { Authorized } from '@/auth/decorators/authorized.decorator';
import { createTodoDto } from './dto/create_todo.dto';
import { PatchTodoDto } from './dto/patch_todo.dto';

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
    @Body() dto: createTodoDto
  ) {
    return this.todoService.create(id, dto)
  }

  @Patch()
  patch(
    @Body() dto: PatchTodoDto
  ) {
    return this.todoService.patch(dto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id)
  }
}
