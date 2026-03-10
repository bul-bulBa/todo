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
import CheckList from "./CheckList"


const UpdateTodo = () => {
    const { unSetTodo, todo } = useUpdate()

    const { control, register, handleSubmit, reset } = useForm<TypeTodoSchema>({
        resolver: zodResolver(todoSchema),
        defaultValues: todo ?? {}
    })
    
    const { update, isUpdatePending } = useUpdateMutation()

    const onSubmit = (values: TypeTodoSchema) => {
        update(values)
        unSetTodo()
    }
    console.log('PING', todo)
    if (!todo) return null
    console.log('PONG', todo)
    return (
        <Dialog defaultOpen onOpenChange={(open) => !open && unSetTodo()}>
            <DialogContent showCloseButton={false}
                className="w-[80vw] flex flex-col justify-center items-center">
                <DialogHeader>
                    <DialogTitle>Update todo</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Textarea placeholder="Type your todo here" {...register('text')}
                        // value={form.text}
                        // onChange={(e) => setForm(prev => prev
                        //     ? { ...prev, text: e.target.value }
                        //     : prev)}
                        disabled={isUpdatePending} />

                    <CheckList control={control} register={register} />

                    <DialogClose>
                        <Button type="submit" >Update</Button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateTodo

// // 1. Компонент з логікою форми
// const UpdateTodoForm = ({ todo, unSetTodo }: { todo: TypeTodoSchema, unSetTodo: () => void }) => {
//     const { control, register, handleSubmit } = useForm<TypeTodoSchema>({
//         resolver: zodResolver(todoSchema),
//         defaultValues: todo // Тут воно спрацює ідеально, бо todo вже точно є
//     })
    
//     const { update, isUpdatePending } = useUpdateMutation()

//     const onSubmit = (values: TypeTodoSchema) => {
//         update(values)
//         unSetTodo()
//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <Textarea {...register('text')} disabled={isUpdatePending} />
//             <CheckList control={control} register={register} />
//             <Button type="submit">Update</Button>
//         </form>
//     )
// }

// // 2. Основний компонент (Контейнер)
// const UpdateTodo = () => {
//     const { unSetTodo, todo } = useUpdate()

//     if (!todo) return null // Тепер цей return нічого не ламає

//     return (
//         <Dialog defaultOpen>
//             <DialogContent>
//                 <DialogHeader><DialogTitle>Update todo</DialogTitle></DialogHeader>
                
//                 {/* Передаємо дані в під-компонент */}
//                 <UpdateTodoForm todo={todo} unSetTodo={unSetTodo} />
                
//             </DialogContent>
//         </Dialog>
//     )
// }