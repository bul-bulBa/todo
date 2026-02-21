import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import jwt from 'jsonwebtoken'
import { TokenType, User } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly config: ConfigService,
        private readonly prismaService: PrismaService
    ) { }

    accessVerify(token: string): string {
        const id = jwt.verify(token, this.config.getOrThrow<string>('JWT_ACCESS_SECRET'))
        if (!id) throw new UnauthorizedException('You are unauthorized')
        return id
    }

    refreshVerify(token: string): string {
        const id = jwt.verify(token, this.config.getOrThrow<string>('JWT_REFRESH_SECRET'))
        if (!id) throw new UnauthorizedException('You are unauthorized')
        return id
    }

    async generateTokens(id, req: Request) {
        const accessToken = jwt.sign({ id }, this.config.getOrThrow('JWT_ACCESS_SECRET'), { expiresIn: '30m' })
        const refreshToken = jwt.sign({ id }, this.config.getOrThrow('JWT_REFRESH_SECRET'), { expiresIn: '30d' })
        await this.saveRefreshToken(id, refreshToken, req)
        return { accessToken, refreshToken }
    }

    private async saveRefreshToken(email, token, req: Request) {
        const ipAddress = req.headers['x-forwarded-for']?.toString() || req.ip || ''
        const userAgent = req.get('user-agent') || ''

        await this.prismaService.token.create({
            data: {
                email,
                token,
                userAgent,
                ipAddress,
                type: TokenType.REFRESH,
                expiresIn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        })
    }

    async removeRefreshToken(token) {
        const existing = await this.prismaService.token.findUnique({
            where: { token, type: TokenType.REFRESH }
        })
        
        if (existing) {
            await this.prismaService.token.delete({
                where: { token }
            })
        }
        
        return true
    }
}
