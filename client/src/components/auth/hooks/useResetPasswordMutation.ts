import { useMutation } from "@tanstack/react-query"
import { authService } from "../api/auth.api"
import { toast } from "sonner"
import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"
import type { TypeResetPasswordSchema } from "../schemas/reset-password.schema"


export const useResetPasswordMutation = () => {
    const {mutate: reset, isPending: isLoadingReset} = useMutation({
        mutationKey: ['reset-password'],
        mutationFn: ({values, recaptcha}: {
            values: TypeResetPasswordSchema,
            recaptcha: string
        }) => authService.resetPassword(values, recaptcha),
        onSuccess() {
            toast.success('check your email box', {
                description: 'To your email was sent confirm reset password link'
            })
        },
        onError(error) {
            toastMessageHandler(error)
        }
    })

    return {reset, isLoadingReset}
}