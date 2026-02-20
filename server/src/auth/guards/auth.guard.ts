import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import jwt from 'jsonwebtoken'
import { UserService } from "src/user/user.service";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly config: ConfigService,
        private readonly token: TokenService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        if(!request.cookies.accessToken)
            throw new UnauthorizedException('user unauthorized')

        const id = this.token.accessVerify(request.cookies.accessToken)
        
        const user = await this.userService.findById(id)

        request.user = user

        return true
    }
}