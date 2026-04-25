import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import CreateTodo from "./CreateTodo"
import TodoList from "./TodoList"
import { Button } from "@/components/ui/button"
import UpdateTodo from "./UpdateTodo"
import { Link } from "@tanstack/react-router"
import { Settings } from "lucide-react"

const TodoPage = () => {

    return (
        <div className="relative w-full h-full">

            <div className="fixed right-5 bottom-5">
                <Dialog >
                    <DialogTrigger asChild>
                        <Button className="w-[40px] h-[40px]">+</Button>
                    </DialogTrigger>
                    <CreateTodo />
                </Dialog>
            </div>
            {/* <div className="fixed right-20 bottom-5">
                <Button className="w-[40px] h-[40px]" variant='outline'>
                    <Link to="/settings">
                        <Settings />
                    </Link>
                </Button>
            </div> */}
            <TodoList />
            <UpdateTodo />
        </div>
    )
}

export default TodoPage