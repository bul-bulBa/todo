import { useTodoQuery } from "../hooks/useTodoQuery"
import type { Todo } from "../types/todoType"
import TodoItem from "./TodoItem"


const TodoList = () => {

    const { todos, isTodoLoading } = useTodoQuery()

    console.log(todos)
    if (todos?.length < 1) return <div>You haven't todos</div>
    return (
        <>
            {isTodoLoading && <div>...Loading</div>}
            {todos?.map((t: Todo) => (
                <div className="m-2" key={t.id}>
                    <TodoItem />
                </div>
            ))}
        </>
    )
}

export default TodoList