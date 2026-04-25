import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@/libs/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { TokenService } from '../token/token.service';
import { TokenType } from '@/../prisma/generated/enums';
import { UserService } from '@/user/user.service';

@Injectable()
export class TwoFactorService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly config: ConfigService,
        private readonly mailService: MailService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService
    ) {}

    async validateTwoFactorToken(email: string, code: string) {
        const existingToken = await this.prismaService.token.findFirst({
            where: { email, type: TokenType.TWO_FACTOR}
        })

        if(!existingToken) throw new NotFoundException('token is not found, please check if code is correct')
        
        if(existingToken.token !== code) throw new BadRequestException('incorrect code')
        
        const hasExpired = new Date(existingToken.expiresIn) < new Date()
        if(hasExpired) throw new BadRequestException('code is expired, please request new code')

        await this.prismaService.token.delete({
            where: { id: existingToken.id, type: TokenType.TWO_FACTOR }
        })

        return true
    }

    async sendTwoFactorToken(email: string) {
        const twoFactorToken = await this.generateTwoFactorToken(email)

        await this.mailService.sendTwoFactorCode(twoFactorToken.email, twoFactorToken.token)

        return true
    }

    async generateTwoFactorToken(email: string) {
        const token = Math.floor(100000 + Math.random() * 999999).toString()
        const expiresIn = new Date(Date.now() + 60000)

        const existingToken = await this.prismaService.token.findFirst({
            where: { email, type: TokenType.TWO_FACTOR }
        })

        const user = await this.userService.findByEmail(email)
        if(!user) throw new BadRequestException('user with this email does not exist, please check if the email is correct')

        if(existingToken) {
            await this.prismaService.token.delete({
                where: { id: existingToken.id }
            })
        }

        const twoFactorToken = await this.prismaService.token.create({ 
            data: {
                email,
                token,
                expiresIn,
                type: TokenType.TWO_FACTOR,
                userId: user.id
            }
        })

        return twoFactorToken
    }

}
