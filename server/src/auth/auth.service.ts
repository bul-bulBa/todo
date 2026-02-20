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

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly config: ConfigService,
        private readonly tokenService: TokenService
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

        const tokens = this.tokenService.generateTokens(newUser.id, req)
        console.log('SERVICE TOKENS ', tokens)
        return {user: newUser, tokens}
    }

    async login(dto: LoginDto, req: Request) {
        const user = await this.userService.findByEmail(dto.email)
        if(!user) throw new NotFoundException('This user is not exist')

        const passwordConstraights = bcrypt.compare(dto.password, user.password)
        if(!passwordConstraights) throw new UnauthorizedException('Incorrect email or password, please check entered data')

        // if(!user.isVerified) throw new UnauthorizedException('Your email not verified, please check your email and confirm address')

        const tokens = await this.tokenService.generateTokens(user.id, req)
        console.log('SERVICE TOKENS ', tokens)
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
