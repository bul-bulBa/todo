import { useTodoQuery } from "../hooks/useTodoQuery"
import type { Todo } from "../types/todoType"
import TodoItem from "./TodoItem"


const TodoList = () => {

    const { todos, isTodoLoading } = useTodoQuery()

    console.log(todos)
    if (todos?.length < 1) return <div>You haven't todos</div>
    return (
        <div className="flex flex-col items-center w-screen">
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