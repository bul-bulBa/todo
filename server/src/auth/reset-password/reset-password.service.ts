import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MailService } from '@/libs/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { TokenType } from '@/../prisma/generated/enums';
import { NewPasswordDto } from './dto/new-password.dto';
import bcrypt from 'bcrypt'

@Injectable()
export class ResetPasswordService {
    constructor(
        private readonly mailService: MailService,
        private readonly prismaService: PrismaService,
        private readonly userService: UserService
    ) { }

    async reset(dto: ResetPasswordDto) {
        const existingUser = await this.userService.findByEmail(dto.email)

        if (!existingUser) throw new NotFoundException('user is undefined. Check if correct email address')

        const newToken = await this.generateResetPasswordToken(existingUser.email, existingUser.id)

        await this.mailService.sendPasswordReset(existingUser.email, newToken)

        return true
    }

    async new(dto: NewPasswordDto, token: string) {
        const existingToken = await this.prismaService.token.findFirst({
            where: {
                token,
                type: TokenType.PASSWORD_RESET
            }
        })

        if (!existingToken) throw new NotFoundException('token is undefined. Check if the token correct')

        const hasExpired = new Date(existingToken.expiresIn) < new Date()

        if (hasExpired) throw new BadRequestException('reset password token is expired. Please request a new token')

        const existingUser = await this.userService.findByEmail(existingToken.email)
        if (!existingUser) throw new NotFoundException('user is undefined. Check if correct email address')

        await this.prismaService.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                password: await bcrypt.hash(dto.password, 3)
            }
        })

        await this.prismaService.token.delete({
            where: {
                id: existingToken.id,
                type: TokenType.PASSWORD_RESET
            }
        })

        return true
    }

    async generateResetPasswordToken(email: string, existingUserId: string) {
        const token = uuidv4()
        const expiresIn = new Date(Date.now() + 3600 * 1000)

        const existingToken = await this.prismaService.token.findFirst({
            where: {
                email,
                type: TokenType.PASSWORD_RESET
            }
        })

        if (existingToken) {
            await this.prismaService.token.delete({
                where: {
                    id: existingToken.id,
                    type: TokenType.PASSWORD_RESET
                }
            })
        }

        const newToken = await this.prismaService.token.create({
            data: {
                email,
                token,
                expiresIn,
                type: TokenType.PASSWORD_RESET,
                userId: existingUserId
            }
        })

        return newToken.token
    }

}
