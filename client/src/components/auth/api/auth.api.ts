import { api } from "@/lib/axios.config";
import type { TypeRegisterSchema } from "../schemas/register.schema";
import type { TypeLoginSchema } from "../schemas/login.schema";

class AuthService {
    async register(body: TypeRegisterSchema, recaptcha?: string) {
        return await api.post('/auth/register', body)
    }

    async login(values: TypeLoginSchema) {
        return await api.post('/auth/login', values)
    }

    async confirmVerification(token: string) {
        return await api.post('/auth/email-confirmation', { token })
    }
}

export const authService = new AuthService