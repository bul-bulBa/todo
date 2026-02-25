import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"
import { authService } from "../api/auth.api"
import type { TypeRegisterSchema } from "../schemas/register.schema"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { useIsAuth } from "@/clientStore/isAuth"


export const useRegisterMutation = () => {
    const { mutate: register, isPending: isLoadingRegister } = useMutation({
        mutationKey: ['register-user'],

        mutationFn: (values: TypeRegisterSchema) => authService.register(values),

        onSuccess(data: any) {
            useIsAuth.setState(() => ({isAuth: true}))
            toastMessageHandler(data)
        },

        onError(error: any) {
            toastMessageHandler(error)
        }
    })

    return { register, isLoadingRegister }
}
