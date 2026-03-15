import { useMutation } from "@tanstack/react-query"
import { authService } from "../api/auth.api"
import { toast } from "sonner"
import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"


export const useResetPasswordMutation = () => {
    const {mutate: reset, isPending: isLoadingReset} = useMutation({
        mutationKey: ['reset-password'],
        mutationFn: authService.resetPassword,
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