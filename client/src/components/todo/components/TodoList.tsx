import { useTodoQuery } from "../hooks/useTodoQuery"
import type { Todo } from "../types/todoType"
import TodoItem from "./TodoItem"


const TodoList = () => {

    const { todos, isTodoLoading } = useTodoQuery()

    if (todos?.length < 1) return <div>You haven't todos</div>
    return (
        <div className="flex flex-col items-center pb-[70px]">
            {isTodoLoading && <div>...Loading</div>}
            {todos?.map((t: Todo) => (
                <div className="m-2 w-[95%]" key={t.id}>
                    <TodoItem todo={t} />
                </div>
            ))}
        </ div>
    )
}

export default TodoList