import { useUpdate } from "@/clientStore/useUpdate"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import type { Todo } from "../types/todoType"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useUpdateMutation } from "../hooks/userUpdateMutation"


const UpdateTodo = () => {
    const queryClient = useQueryClient()
    const { editingId, unSetTodo } = useUpdate()
    const [form, setForm] = useState<Todo | null>(null)

    useEffect(() => {
        if (!editingId) return setForm(null)

        const todo = queryClient.getQueryData<Todo[]>(['todo-query'])
            ?.find(t => t.id === editingId)

        setForm(todo ? { ...todo } : null)
    }, [editingId, queryClient])

    const { update, isUpdatePending } = useUpdateMutation()

    if (!form) return null

    const updateFunc = () => {
        update({
            todoId: editingId,
            text: form.text,
            deadline: form.deadline,
        })
        unSetTodo()
        setForm(null)
    }

    return (
        <Dialog defaultOpen>
            <DialogContent showCloseButton={false}
                className="w-[80vw] flex flex-col justify-center items-center">
                <DialogHeader>
                    <DialogTitle>Update todo</DialogTitle>
                </DialogHeader>

                <Textarea placeholder="Type your todo here" value={form.text}
                    onChange={(e) => setForm(prev => prev
                        ? { ...prev, text: e.target.value }
                        : prev)}
                disabled={isUpdatePending}/>

                <DialogClose>
                    <Button onClick={updateFunc}>Update</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateTodo