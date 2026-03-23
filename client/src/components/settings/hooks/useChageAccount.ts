import { useMutation } from "@tanstack/react-query"
import { settingsApi } from "../services/settings.api"
import { useIsAuth } from "@/clientStore/isAuth"
import { toast } from "sonner"
import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"


export const useChangeAccount = () => {

    const { mutate: change, isPending: isLoadingChanging } = useMutation({
        mutationKey: ['changing-account'],
        mutationFn: settingsApi.update,
        onSuccess: (user) => {
            useIsAuth.setState({ user })
            toast.success('successfull update')
        }, onError: (e) => {
            toastMessageHandler(e)
        }
    })

    return {change, isLoadingChanging}
}