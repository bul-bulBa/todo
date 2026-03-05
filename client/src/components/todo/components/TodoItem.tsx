import { Spinner } from "@/components/ui/spinner"
import { useDeleteMutation } from "../hooks/useDeleteMutation"
import { useUpdateMutation } from "../hooks/userUpdateMutation"
import type { Todo } from "../types/todoType"
import { CircleCheckBig, Circle, Delete } from 'lucide-react'

type Props = {
    todo: Todo
}

const TodoItem = ({ todo }: Props) => {

    const { deleteTodo, isDeletePending } = useDeleteMutation()
    const { update, isUpdatePending } = useUpdateMutation()

    return (
        <div className="grid grid-cols-3 p-3 border rounded-xl">

            <div>{todo.complete
                ? <CircleCheckBig onClick={() =>
                    update({ complete: false, todoId: todo.id })} />
                : <Circle onClick={() =>
                    update({ complete: true, todoId: todo.id })} />}</div>

            <div className={`${todo.complete ? 'line-through' : ''}`}>{todo.text}</div>
            <div className="flex justify-end">
                {isDeletePending ? <Spinner /> : <Delete onClick={() => deleteTodo(todo.id)} />}
            </div>
        </div>
    )
}

export default TodoItem