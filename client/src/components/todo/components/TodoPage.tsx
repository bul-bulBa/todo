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
            <div className="absolute right-10 bottom-10">
                <Dialog >
                    <DialogTrigger>
                        <Button>+</Button>
                    </DialogTrigger>
                    <DialogContent className='w-[80vw] flex justify-center items-center'>
                        <CreateTodo />
                    </DialogContent>
                </Dialog>
            </div>
            <TodoList />
            <UpdateTodo />
        </div>
    )
}

export default TodoPage