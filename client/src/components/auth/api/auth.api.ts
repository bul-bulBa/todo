import { api } from "@/lib/axios.config";
import type { TypeRegisterSchema } from "../schemas/register.schema";
import type { TypeLoginSchema } from "../schemas/login.schema";
import type { TypeResetPasswordSchema } from "../schemas/reset-password.schema";

class AuthService {
    register = (body: TypeRegisterSchema, recaptcha: string) =>
        api.post('/auth/register', body,
            { headers: { "recaptcha": recaptcha } })
            .then(res => res.data)

    login = (body: TypeLoginSchema, recaptcha: string) =>
        api.post('/auth/login', body,
            { headers: { "recaptcha": recaptcha } })
            .then(res => res.data)

    confirmVerification = (token: string) =>
        api.post('/auth/email-confirmation', { token }).then(res => res.data)

    oauthByProvider = (provider: string) =>
        api.get(`/auth/oauth/connect/${provider}`).then(res => res.data)

    resetPassword = (body: TypeResetPasswordSchema, recaptcha: string) =>
        api.post('/auth/reset-password/reset', body,
            { headers: { "recaptcha": recaptcha } })
            .then(res => res.data)

    newPassword = (password: string, token: string): Promise<boolean> =>
        api.post(`/auth/reset-password/new/${token}`, { password }).then(res => res.data)
}

export const authService = new AuthService