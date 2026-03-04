import { useMutation, useQueryClient } from "@tanstack/react-query"
import { todoService } from "../api/todo.api"
import type { Todo } from '../types/todoType'

export const useUpdateMutation = () => {
    const queryClient = useQueryClient()

    const { mutate: update, isPending: isUpdatePending } = useMutation({
        mutationKey: ['update_mutation'],
        mutationFn: todoService.update,
        onSuccess(todo: Todo) {
            queryClient.setQueryData<Todo[]>(['todo-query'],
                (old = []) => old.map(t => t.id === todo.id ? todo : t)) || []
        }
    })

    return {update, isUpdatePending}
}