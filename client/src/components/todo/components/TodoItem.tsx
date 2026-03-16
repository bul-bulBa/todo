import { Spinner } from "@/components/ui/spinner"
import { useDeleteMutation } from "../hooks/useDeleteMutation"
import { useUpdateMutation } from "../hooks/userUpdateMutation"
import type { Todo } from "../types/todoType"
import { CircleCheckBig, Circle, Delete, Square, SquareCheckBig } from 'lucide-react'
import { useUpdate } from "@/clientStore/useUpdate"
import type React from "react"

type Props = {
    todo: Todo
}

const TodoItem = ({ todo }: Props) => {
    const { setTodo } = useUpdate()
    const { deleteTodo, isDeletePending } = useDeleteMutation()
    const { update, isUpdatePending } = useUpdateMutation()

    const check = (completed: boolean, i: number) => {
        update({
            todoId: todo.id, checkList: todo.checkList.map((item, index) =>
                index === i
                    ? { ...item, completed }
                    : item)
        })
    }

    return (
        <div className="grid grid-cols-[40px_1fr_40px] grid-rows-[auto_auto] p-3 border rounded-xl"
            onContextMenu={(e) => {
                e.preventDefault()
                setTodo(todo.id, todo)
            }}>

            <div>{todo.complete
                ? <CircleCheckBig onClick={() =>
                    update({ ...todo, complete: false, todoId: todo.id })} />
                : <Circle onClick={() =>
                    update({ ...todo, complete: true, todoId: todo.id })} />}</div>

            <div className={`${todo.complete ? 'line-through' : ''} break-words`}
                style={{ overflowWrap: 'anywhere' }}>
                {todo.text}
            </div>

            <div className="flex justify-end row-start-1 col-start-3">
                {isDeletePending ? <Spinner /> : <Delete onClick={() => deleteTodo(todo.id)} />}
            </div>

            <div className="row-start-2 col-start-2 pt-5 flex flex-col gap-2">
                {todo.checkList?.map((c, i) => (
                    <div className="flex gap-3" key={c.text}>
                        {c.completed
                            ? <SquareCheckBig className="flex-shrink-0" onClick={() => check(false, i)} />
                            : <Square className="flex-shrink-0" onClick={() => check(true, i)} />}

                        <div className={`${c.completed ? 'line-through' : ''} break-words`}
                            style={{ overflowWrap: 'anywhere' }}>
                            {c.text}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodoItem