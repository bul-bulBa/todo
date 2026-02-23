import { api } from "@/lib/axios.config"
import { useMutation } from "@tanstack/react-query"
import { authService } from "../api/auth.api"
import type { TypeLoginSchema } from "../schemas/login.schema"
import { toastMessageHandler } from "@/lib/toastMessageHandler"


export const useLoginMutation = () => {
    const {mutate: login, isPending: isLoadingLogin} = useMutation({
        mutationKey: ['auth-login'],
        mutationFn: (values: TypeLoginSchema) => authService.login(values),

        onSuccess: (data: any) => {
            toastMessageHandler(data)
        },
        onError: (error: any) => {
            toastMessageHandler(error)
        }
    })

    return { login, isLoadingLogin }
}