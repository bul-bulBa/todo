import { useMeQuery } from "../hooks/useMeQuery"
import CreateTodo from "./CreateTodo"
import TodoList from "./TodoList"

const TodoPage = () => {

    const { me, isLoadingMe} = useMeQuery()

    return (
        <div>
            <CreateTodo />
            <TodoList />
        </div>
    )
}

export default TodoPage