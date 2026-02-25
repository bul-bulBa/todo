import { useMutation } from "@tanstack/react-query"
import { authService } from "../api/auth.api"
import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"
import { useNavigate } from "@tanstack/react-router"
import { useIsAuth } from "@/clientStore/isAuth"


export const useEmailConfirmationMutation = () => {
    const navigate = useNavigate()

    const { mutate, isPending } = useMutation({
        mutationKey: ['auth-login'],
        mutationFn: (token: string) => 
            authService.confirmVerification(token),

        onSuccess: (data: any) => {
            toastMessageHandler(data)
            useIsAuth.setState(() => ({isAuth: true}))
            navigate({to: '/todo'})
        },
        onError: (error: any) => {
            toastMessageHandler(error)
            navigate({to: '/auth/register'})
        }
    })

    return { mutate, isPending}
}