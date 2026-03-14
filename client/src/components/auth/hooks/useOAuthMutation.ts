import { useMutation } from "@tanstack/react-query"
import { authService } from "../api/auth.api"


export const useOAuthMutation = () => {
    const { mutate } = useMutation({
        mutationKey: ['oauth_by_provider'],
        mutationFn: authService.oauthByProvider,
        onSuccess: (data) => {
            if(data && data.url) window.location.href = data.url
        }
    })

    return mutate
}