import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import jwt from 'jsonwebtoken'
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly config: ConfigService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        if(!request.cookies.accessToken)
            throw new UnauthorizedException('user unauthorized')

        const id = jwt.verify(request.cookies.accessToken, this.config.getOrThrow<string>('JWT_SECRET'))
        
        const user = await this.userService.findById(id)

        request.user = user

        return true
    }
}