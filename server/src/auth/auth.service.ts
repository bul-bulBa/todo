import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { AuthMethod, TokenType } from '@/../prisma/generated/enums';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt'
import { TokenService } from './token/token.service';
import { Response, type Request } from 'express';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { TwoFactorService } from './two-factor/two-factor.service';
import { ProviderService } from './provider/provider.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly config: ConfigService,
        private readonly tokenService: TokenService,
        private readonly emailConfirmationService: EmailConfirmationService,
        private readonly twoFactorService: TwoFactorService,
        private readonly providerService: ProviderService
    ) { }

    async register(dto: RegisterDto, req: Request) {
        const { email, password } = dto

        const user = await this.userService.findByEmail(email)
        if (user) throw new ConflictException('User with this email already exist. Please use another email, or login to system')

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
        if (!user) throw new NotFoundException('This user is not exist')

        const passwordConstraights = await bcrypt.compare(dto.password, user.password)
        if (!passwordConstraights) throw new BadRequestException('Incorrect email or password, please check entered data')

        if (!user.isVerified) {
            await this.emailConfirmationService.sendVerificationToken(user.email)
            throw new BadRequestException('Your email not verified, please check your email and confirm address')
        }

        if (user.isTwoFactorEnabled) {
            if (!dto.code) {
                await this.twoFactorService.sendTwoFactorToken(user.email)
                return { message: 'check your email box. Needed two factor authentification code' }
            }

            await this.twoFactorService.validateTwoFactorToken(user.email, dto.code)
        }

        const tokens = await this.tokenService.generateTokens(user.id, req)
        return { user, tokens }
    }

    async logout(req: Request, res: Response) {
        const refreshToken = req.cookies['refreshToken']
        await this.tokenService.removeRefreshToken(refreshToken)

        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')
        return res.json({ message: true })
    }

    async refresh(req: Request) {
        const oldRefreshToken = req.cookies['refreshToken']

        if (!oldRefreshToken) throw new UnauthorizedException('Refresh token is undefined')

        const userId = await this.tokenService.refreshVerify(oldRefreshToken)

        const existingToken = await this.prismaService.token.findFirst({
            where: { token: oldRefreshToken, type: TokenType.REFRESH }
        })

        if (!existingToken) throw new UnauthorizedException("Refresh token is undefined")

        const hasExpired = new Date(existingToken?.expiresIn) < new Date()
        if (hasExpired) throw new UnauthorizedException("Refresh token is expired")

        await this.tokenService.removeRefreshToken(existingToken.token)
        const tokens = await this.tokenService.generateTokens(userId, req)

        return { tokens, message: true }
    }

    async extractProfileFromCode(
        req: Request,
        provider: string,
        code: string
    ) {
        const providerInstance = this.providerService.findByService(provider)
        const profile = await providerInstance?.findUserByCode(code)
        if (!profile) throw new BadRequestException()

        const account = await this.prismaService.account.findUnique({
            where: {
                provider_sub: {
                    sub: profile.id,
                    provider: profile.provider
                }
            }
        })
        console.log('PROFILE', profile, 'ACCOUNT', account)
        let user
        if (account?.userId) user = await this.userService.findById(account.userId)
        else user = await this.userService.findByEmail(profile.email)

        if (user) return await this.tokenService.generateTokens(user.id, req)

        user = await this.userService.create(
            profile.email,
            '',
            AuthMethod[profile.provider.toUpperCase()],
            true
        )

        if (!account) await this.prismaService.account.create({
            data: {
                userId: user.id,
                type: 'oauth',
                provider: profile.provider,
                sub: profile.id,
                accessToken: profile.access_token,
                refreshToken: profile.refresh_token,
                expiresAt: profile.expires_at
            }
        })

        return await this.tokenService.generateTokens(user.id, req)
    }
}
