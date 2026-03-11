import { useQuery } from "@tanstack/react-query"
import { todoService } from "../api/todo.api"


export const useMeQuery = () => {
    const {data: me, isLoading: isLoadingMe} = useQuery({
        queryKey: ['query_me'],
        queryFn: () => todoService.getMe(),
    })

    return {me, isLoadingMe}
}