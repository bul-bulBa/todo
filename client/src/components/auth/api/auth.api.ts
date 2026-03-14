import { api } from "@/lib/axios.config";
import type { TypeRegisterSchema } from "../schemas/register.schema";
import type { TypeLoginSchema } from "../schemas/login.schema";

class AuthService {
    register = (body: TypeRegisterSchema, recaptcha?: string) => 
        api.post('/auth/register', body).then(res => res.data)

    login = (values: TypeLoginSchema) => 
        api.post('/auth/login', values).then(res => res.data)

    confirmVerification = (token: string) => 
        api.post('/auth/email-confirmation', { token }).then(res => res.data)

    oauthByProvider = (provider: string) => 
        api.get(`/auth/oauth/connect/${provider}`).then(res => res.data)
}

export const authService = new AuthService