import { useMutation } from "@tanstack/react-query"
import { authService } from "../api/auth.api"
import type { TypeLoginSchema } from "../schemas/login.schema"
import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { useIsAuth } from "@/clientStore/isAuth"


export const useLoginMutation = () => {
    const navigate = useNavigate()

    const { mutate: login, isPending: isLoadingLogin } = useMutation({
        mutationKey: ['auth-login'],
        mutationFn: (values: TypeLoginSchema) => authService.login(values),

        onSuccess: (data: any) => {
            console.log(data)
            if (data.data.user) {
                toast.success('successfull authorization')
                useIsAuth.setState(() => ({ isAuth: true }))
                navigate({ to: '/todo' })
            }
        },
        onError: (error: any) => {
            toastMessageHandler(error)
        }
    })

    return { login, isLoadingLogin }
}