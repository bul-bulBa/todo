import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form"
import type { TypeTodoSchema } from "../schemas/todo.schema"
import { Button } from "@/components/ui/button"

type Props = {
    control: Control<TypeTodoSchema>,
    register: UseFormRegister<TypeTodoSchema>,
}

const CheckList = ({control, register}: Props) => {

    const {fields, append, remove} = useFieldArray({
            control,
            name: 'checkList'
        })

    return (
        <div>
            <h3>CheckList</h3>

            {fields.map((field, index) => (
                <div key={field.id} className="p-2 border rounded-xl flex justify-around">
                    <input type="text" className="border-0 hover:border-0"
                    {...register(`checkList.${index}.text`)} />

                    <Button onClick={() => remove(index)}>Remove</Button>
                </div>
            ))}

            <Button type="button"
            onClick={() => append({text: '', completed: false})}>
                +
            </Button>
        </div>
    )
}

export default CheckList