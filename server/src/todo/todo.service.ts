import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
    constructor( private readonly prismaService: PrismaService ) {}

    async get(userId: string) {

        const todos = await this.prismaService.todo.findMany({
            where: { userId }
        })

        return todos
    }
}
