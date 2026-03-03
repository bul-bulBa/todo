import { useQuery } from "@tanstack/react-query"
import { todoService } from "../api/todo.api"
import type { Todo } from "../types/todoType"


export const useTodoQuery = () => {

    const { data: todos, isLoading: isTodoLoading } = useQuery({
        queryKey: ['todo-query'],
        queryFn: todoService.getTodo
    })

    return {todos, isTodoLoading}
}