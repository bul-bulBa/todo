import { useTodoQuery } from "../hooks/useTodoQuery"
import TodoItem from "./TodoItem"


const TodoList = () => {

    const { todos, isTodoLoading } = useTodoQuery()

    // if(!todos) return null

    return (
        <>
            {isTodoLoading && <div>...Loading</div>}
            {todos?.map(t => (
                <div className="m-2" key={t.id}>
                    <TodoItem />
                </div>
            ))}
        </>
    )
}

export default TodoList