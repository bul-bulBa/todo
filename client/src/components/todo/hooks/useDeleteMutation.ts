import { useMutation, useQueryClient } from "@tanstack/react-query"
import { todoService } from "../api/todo.api"
import type { Todo } from "../types/todoType"

export const useDeleteMutation = () => {
    const queryClient = useQueryClient()

    const { mutate: deleteTodo, isPending: isDeletePending } = useMutation({
        mutationFn: (deleteId: string) => todoService.delete(deleteId),
        onSuccess(_, deleteId) {
            queryClient.setQueryData<Todo[]>(['todo-query'],
                (old = []) => old.filter(t => t.id !== deleteId) || []
            )
        }
    })

    return { deleteTodo, isDeletePending}
}