import { useForm } from "react-hook-form"
import { todoSchema, type TypeTodoSchema } from "../schemas/todo.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateMutation } from "../hooks/userUpdateMutation"
import type { Todo } from "../types/todoType"
import { Textarea } from "@/components/ui/textarea"
import CheckList from "./CheckList"
import { Button } from "@/components/ui/button"
import { useUpdate } from "@/clientStore/useUpdate"
import { addOrder } from "../functions/addOrder"

type Props = {
    todo: Todo
}

const UpdateTodoForm = ({todo}: Props) => {
    const { unSetTodo } = useUpdate()

    const { control, register, handleSubmit, formState: {errors} } = useForm<TypeTodoSchema>({
        resolver: zodResolver(todoSchema),
        values: todo
    })

    const { update, isUpdatePending } = useUpdateMutation()

    const onSubmit = (values: TypeTodoSchema) => {
        const checkList = addOrder(values.checkList)
        update({...values, checkList, todoId: todo.id})
        unSetTodo()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Textarea placeholder="Type your todo here"
                    {...register('text')} disabled={isUpdatePending} />
                <CheckList control={control} register={register} />
                <Button type="submit" >Update</Button>
            </form>
        </div>
    )
}

export default UpdateTodoForm