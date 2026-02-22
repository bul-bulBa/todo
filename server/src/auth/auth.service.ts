import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { AuthMethod } from 'prisma/generated/enums';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt'
import { TokenService } from './token/token.service';
import { Response, type Request } from 'express';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { TwoFactorService } from './two-factor/two-factor.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly config: ConfigService,
        private readonly tokenService: TokenService,
        private readonly emailConfirmationService: EmailConfirmationService,
        private readonly twoFactorService: TwoFactorService
    ) {}

    async register(dto: RegisterDto, req: Request) {
        const {email, password} = dto

        const user = await this.userService.findByEmail(email)
        if(user) throw new ConflictException('User with this email already exist. Please use another email, or login to system')

        const newUser = await this.userService.create(
            email, 
            password,
            AuthMethod.CREDENTIALS,
            false
        )

        await this.emailConfirmationService.sendVerificationToken(newUser.email)

        return { message: `You successfully authorized, please confirm your email. Message was sent to your email address` }
    }

    async login(dto: LoginDto, req: Request) {
        const user = await this.userService.findByEmail(dto.email)
        if(!user) throw new NotFoundException('This user is not exist')

        const passwordConstraights = bcrypt.compare(dto.password, user.password)
        if(!passwordConstraights) throw new UnauthorizedException('Incorrect email or password, please check entered data')

        if(!user.isVerified) {
            await this.emailConfirmationService.sendVerificationToken(user.email)
            throw new UnauthorizedException('Your email not verified, please check your email and confirm address')
        }

        if(user.isTwoFactorEnabled) {
            if(!dto.code) {
                await this.twoFactorService.sendTwoFactorToken(user.email)
                return { message: 'check your email box. Needed two factor authentification code' } 
            }

            await this.twoFactorService.validateTwoFactorToken(user.email, dto.code)
        }

        const tokens = await this.tokenService.generateTokens(user.email, req)
        return {user, tokens}
    }

    async logout(req: Request, res: Response) {
        const refreshToken = req.cookies['refreshToken']
        await this.tokenService.removeRefreshToken(refreshToken)

        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')
        return res.json({ message: true })
    }

}
