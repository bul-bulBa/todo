import { useMutation, useQueryClient } from "@tanstack/react-query"
import { todoService } from "../api/todo.api"
import type { Todo } from "../types/todoType"


export const useCreateMutation = () => {
    const queryClient = useQueryClient()

    const {mutate: createTodo, isPending: isPendingTodo} = useMutation({
        mutationKey: ['mutation_todo'],
        mutationFn: todoService.create,
        onSuccess: (data) => {
            const todo = data
            const previousData = queryClient.getQueryData<Todo[]>(['todo-query']) || []
            console.log('MUTATION', previousData, todo)
            queryClient.setQueryData(['todo-query'], [...previousData, todo])
        }
    })

    return {createTodo, isPendingTodo}
}