import { queryOptions, useQuery } from "@tanstack/react-query"
import { todoService } from "../api/todo.api"
import { useIsAuth } from "@/clientStore/isAuth"
import { toast } from "sonner"


export const useQueryOptions = queryOptions({
    queryKey: ['auth'],
    queryFn: async () => {
        const data = await todoService.getMe()
        if(data) {
            console.log(data)
            useIsAuth.setState({ isAuth: true })
        }
        else throw toast.error('Unauthorized')

        return data
    },
    retry: false,
    staleTime: Infinity,
})