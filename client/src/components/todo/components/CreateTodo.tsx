import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRef } from "react"
import { useCreateMutation } from "../hooks/useCreateMutation"
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const CreateTodo = () => {
    const text = useRef('')

    const { createTodo, isPendingTodo } = useCreateMutation()

    return (
        <div className="">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new todo</DialogTitle>
                </DialogHeader>
                {/* {isPendingTodo && <div>...loading</div>} */}
                <Textarea placeholder="Type your todo here"
                    onChange={(e) => text.current = e.target.value} />
                <DialogClose>
                    <Button onClick={() => createTodo(text.current)}>Create</Button>
                </DialogClose>
            </DialogContent>
        </div>
    )
}

export default CreateTodo