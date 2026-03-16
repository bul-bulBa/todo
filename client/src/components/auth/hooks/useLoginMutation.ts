import { useMutation } from "@tanstack/react-query"
import { authService } from "../api/auth.api"
import type { TypeLoginSchema } from "../schemas/login.schema"
import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { useIsAuth } from "@/clientStore/isAuth"
import type { Dispatch, SetStateAction } from "react"


export const useLoginMutation = (
    setIsShowTwoFactor: Dispatch<SetStateAction<boolean>>
) => {
    const navigate = useNavigate()

    const { mutate: login, isPending: isLoadingLogin } = useMutation({
        mutationKey: ['auth-login'],
        mutationFn: ({ values, recaptcha }: {
            values: TypeLoginSchema,
            recaptcha: string
        }) => authService.login(values, recaptcha),

        onSuccess: (data: any) => {
            if (data.user) {
                toast.success('successfull authorization')
                useIsAuth.setState(() => ({ isAuth: true }))
                navigate({ to: '/todo' })
            } else {
                toastMessageHandler(data.message)
                setIsShowTwoFactor(true)
            }
        },
        onError: (error: any) => {
            toastMessageHandler(error)
        }
    })

    return { login, isLoadingLogin }
}