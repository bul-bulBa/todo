import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthMethod } from 'prisma/generated/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }

    async findById(id: string) {
        const user = this.prismaService.user.findUnique({
            where: { id },
            // include: { accounts: true }
        })

        if (!user) throw new NotFoundException('user not found')
        return user
    }

    async findByEmail(email: string) {
        const user = this.prismaService.user.findUnique({
            where: { email },
            // include: { accounts: true }
        })
        return user
    }

    async create(
        email: string,
        password: string,
        method: AuthMethod,
        isVerified: boolean
    ) {

        const user = await this.prismaService.user.create({
            data: {
                email, method, isVerified,
                password: password ? await bcrypt.hash(password, 3) : '',

            },
            // include: {
            //     accounts: true
            // }
        })

        return user
    }

    async update(userId: string, dto: UpdateUserDto) {
        const user = await this.findById(userId)

         if (!user) throw new NotFoundException('user not found')

        const updatedUser = await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                email: dto.email,
                isTwoFactorEnabled: dto.isTwoFactorEnabled
            }
        })

        return updatedUser
    }
}
