import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TokenType } from 'prisma/generated/enums';
import { MailService } from 'src/libs/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { v4 as uuidV4 } from 'uuid'
import { EmailConfirmationDto } from './dto/confirmation-email.dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class EmailConfirmationService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly mailService: MailService,
        private readonly tokenService: TokenService
    ) {}

    async newVerification(req, dto: EmailConfirmationDto) {
        console.log(dto)
        const existingToken = await this.prismaService.token.findUnique({
            where: { token: dto.token}
        })

        if(!existingToken) throw new NotFoundException('token is undefined, check if the token correct')
        
        const hasExpired = new Date(existingToken.expiresIn) < new Date()

        if(hasExpired) throw new BadRequestException('confirmation token is expired, please send new request')

        const existingUser = await this.userService.findByEmail( existingToken.email )

        if(!existingUser) throw new NotFoundException('user is undefined')

        await this.prismaService.user.update({
            where: { id: existingUser.id},
            data: { isVerified: true }
        })

        await this.prismaService.token.delete({
            where: { id: existingToken.id}
        })

        const tokens = await this.tokenService.generateTokens(existingUser.id, req)

        return { tokens }
    }

    async sendVerificationToken(email: string) {
        const verificationToken = await this.generateVerificationToken(email)

        this.mailService.sendConfirmationEmail(verificationToken.email, verificationToken.token)
        console.log('TOKEN', verificationToken.token)
        return true
    }

    async generateVerificationToken(email: string) {
        const token = uuidV4()
        const expiresIn = new Date(Date.now() + 1800 * 1000)

        const existingToken = await this.prismaService.token.findFirst({
            where: { email, type: TokenType.VERIFICATION }
        })

        if(existingToken) {
            await this.prismaService.token.delete({
                where: { id: existingToken.id, type: TokenType.VERIFICATION }
            })
        }

        const verificationToken = await this.prismaService.token.create({
            data: {
                email, 
                token,
                expiresIn,
                type: TokenType.VERIFICATION,
            }
        })

        return verificationToken
    }
}
