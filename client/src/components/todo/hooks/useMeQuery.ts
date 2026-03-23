import { queryOptions, useQuery } from "@tanstack/react-query"
import { todoService } from "../api/todo.api"
import { useIsAuth } from "@/clientStore/isAuth"
import { toast } from "sonner"


export const useQueryOptions = queryOptions({
    queryKey: ['auth'],
    queryFn: async () => {
        try {
            const data = await todoService.getMe()
            if (data) useIsAuth.setState({ isAuth: true, user: data })

            return data
        } catch (e) {
            useIsAuth.setState({ isAuth: false, user: null })
            throw toast.error('Unauthorized')
        }
    },
    retry: false,
    staleTime: Infinity,
})