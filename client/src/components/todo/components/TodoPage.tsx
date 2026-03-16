import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useMeQuery } from "../hooks/useMeQuery"
import CreateTodo from "./CreateTodo"
import TodoList from "./TodoList"
import { Button } from "@/components/ui/button"
import UpdateTodo from "./UpdateTodo"

const TodoPage = () => {

    const { me, isLoadingMe } = useMeQuery()

    return (
        <div className="relative w-full h-full">
            <div className="fixed right-5 bottom-5">
                <Dialog >
                    <DialogTrigger asChild>
                        <Button className="w-[35px] h-[35px]">+</Button>
                    </DialogTrigger>
                    <CreateTodo />
                </Dialog>
            </div>
            <TodoList />
            <UpdateTodo />
        </div>
    )
}

export default TodoPage