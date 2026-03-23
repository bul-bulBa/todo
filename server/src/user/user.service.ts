import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthMethod } from 'prisma/generated/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }

    async findById(id: string) {
        if (!id) throw new BadRequestException('id is undefined')

        const user = this.prismaService.user.findUnique({
            where: { id },
        })

        if (!user) throw new NotFoundException('user not found')
        return user
    }

    async findByEmail(email: string) {
        if (!email) throw new BadRequestException('email is undefined')
        const user = this.prismaService.user.findUnique({
            where: { email },
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

        return new UserDto(updatedUser)
    }
}
