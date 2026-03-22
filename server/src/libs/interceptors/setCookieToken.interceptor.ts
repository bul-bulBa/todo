import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { IS_DEV_ENV } from "../utils/is-dev.util";

export class setCookieToken implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const res = context.switchToHttp().getResponse()

        return next.handle().pipe(
            map(data => {
                if (!data.tokens) return data
                const { accessToken, refreshToken } = data.tokens

                const cookieOptions = {
                    httpOnly: true,
                    secure: !IS_DEV_ENV,
                    sameSite: 'lax'
                }

                if (accessToken)
                    res.cookie('accessToken', data.tokens.accessToken,
                        { maxAge: 30 * 60 * 1000, ...cookieOptions })

                if (refreshToken)
                    res.cookie('refreshToken', data.tokens.refreshToken,
                        { maxAge: 30 * 24 * 60 * 60 * 1000, ...cookieOptions })

                const { tokens, ...other } = data
                return other
            })
        )
    }
}