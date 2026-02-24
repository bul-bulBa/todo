import TodoItem from "./TodoItem"


const TodoList = () => {

    const arr = ['1', '2', '3', '4']

    return (
        <>
            {arr.map((item, index) => (
                <div className="m-2" key={index}>
                    <TodoItem />
                </div>
            ))}
        </>
    )
}

export default TodoList