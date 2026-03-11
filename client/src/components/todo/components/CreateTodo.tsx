import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRef } from "react"
import { useCreateMutation } from "../hooks/useCreateMutation"
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { todoSchema, type TypeTodoSchema } from "../schemas/todo.schema"
import type { Todo } from "../types/todoType"
import CheckList from "./CheckList"
import { addOrder } from "../functions/addOrder"

const CreateTodo = () => {

    const { control, register, handleSubmit } = useForm<TypeTodoSchema>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            text: '',
            deadline: undefined,
            checkList: []
        }
    })

    const { createTodo, isPendingTodo } = useCreateMutation()

    const onSubmit = (values: TypeTodoSchema) => {
        const checkList = addOrder(values.checkList)
        createTodo({...values, checkList})
    }

    return (
        <div className="">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new todo</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Textarea placeholder="Type your todo here"
                        {...register('text')} />

                    <CheckList control={control} register={register} />

                    <DialogClose>
                        <Button type="submit">Create</Button>
                    </DialogClose>
                </form>

            </DialogContent>
        </div>
    )
}

export default CreateTodo