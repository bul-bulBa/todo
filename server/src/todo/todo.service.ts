import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createTodoDto } from './dto/create_todo.dto';
import { PatchTodoDto } from './dto/patch_todo.dto';

@Injectable()
export class TodoService {
    constructor( private readonly prismaService: PrismaService ) {}

    async get(userId: string) {

        const todos = await this.prismaService.todo.findMany({
            where: { userId }
        })

        return todos
    }

    async create(userId: string, dto: createTodoDto) {
        const todo = await this.prismaService.todo.create({
            data: {
                text: dto.text,
                deadline: dto.deadline ?? undefined,
                userId
            }
        })

        return todo
    }

    async patch(dto: PatchTodoDto) {
        const todo = await this.prismaService.todo.update({
            where: { id: dto.todoId },
            data: {
                text: dto.text ?? undefined,
                complete: dto.complete ?? undefined,
                deadline: dto.deadline ?? undefined,
            }
        })

        return todo
    }

    async delete(id: string) {
        const existingTodo = await this.prismaService.todo.findFirst({
            where: { id }
        })
        if(!existingTodo) throw new BadRequestException('Todo is not defined')

        await this.prismaService.todo.delete({
            where: { id }
        })
        
        return { message: true }
    }
}
