import { useUpdate } from "@/clientStore/useUpdate"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import type { Todo } from "../types/todoType"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useUpdateMutation } from "../hooks/userUpdateMutation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { todoSchema, type TypeTodoSchema } from "../schemas/todo.schema"
import UpdateTodoForm from "./UpdateTodoForm"


const UpdateTodo = () => {
    const { unSetTodo, todo } = useUpdate()

    if (!todo) return null
    
    return (
        <Dialog defaultOpen onOpenChange={(open) => !open && unSetTodo()}>
            <DialogContent showCloseButton={false} aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Update todo</DialogTitle>
                </DialogHeader>

                <UpdateTodoForm todo={todo} />

            </DialogContent>
        </Dialog>
    )
}

export default UpdateTodo