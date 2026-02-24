import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"
import { authService } from "../api/auth.api"
import type { TypeRegisterSchema } from "../schemas/register.schema"
import { useMutation } from "@tanstack/react-query"


export const useRegisterMutation = () => {
    const { mutate: register, isPending: isLoadingRegister } = useMutation({
        mutationKey: ['register-user'],

        mutationFn: (values: TypeRegisterSchema) => authService.register(values),

        onSuccess(data: any) {
            toastMessageHandler(data)
        },

        onError(error) {
            toastMessageHandler(error)
        }
    })

    return { register, isLoadingRegister }
}
