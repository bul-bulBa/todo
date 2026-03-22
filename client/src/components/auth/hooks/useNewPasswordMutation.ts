import { useMutation } from "@tanstack/react-query"
import { authService } from "../api/auth.api"
import { useNavigate, useParams } from "@tanstack/react-router"
import { toast } from "sonner"
import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"
import { Route } from '@/routes/_auth/new-password/$token'

export const useNewPasswordMutation = () => {
    const navigate = useNavigate()
    const { token } = Route.useParams()

    const {mutate: change, isPending: isLoadingNewPassword} = useMutation({
        mutationKey: ['new-password'],
        mutationFn: (password: string) => authService.newPassword(password, token),
        onSuccess() { 
            toast.success('Password successfully changed', {
                description: 'Now you can login to your account'
            })
            navigate({ to: '/login' })
        },
        onError(error) {
            toastMessageHandler(error)
        }
    })

    return {change, isLoadingNewPassword}
}