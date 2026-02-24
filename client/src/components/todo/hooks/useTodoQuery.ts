import { useQuery } from "@tanstack/react-query"


export const useTodoQuery = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['todo-query'],
        // queryFn: () => 
    })
}