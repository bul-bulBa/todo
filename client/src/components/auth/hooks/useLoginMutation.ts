import { useMutation } from "@tanstack/react-query"
import { authService } from "../api/auth.api"
import type { TypeLoginSchema } from "../schemas/login.schema"
import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"


export const useLoginMutation = () => {
    const navigate = useNavigate()

    const { mutate: login, isPending: isLoadingLogin } = useMutation({
        mutationKey: ['auth-login'],
        mutationFn: (values: TypeLoginSchema) => authService.login(values),

        onSuccess: (data: any) => {
            if (data.message) {
                toastMessageHandler(data)
            } else {
                toast.success('successfull authorization')
                navigate({ to: '/' })
            }
        },
        onError: (error: any) => {
            toastMessageHandler(error)
        }
    })

    return { login, isLoadingLogin }
}