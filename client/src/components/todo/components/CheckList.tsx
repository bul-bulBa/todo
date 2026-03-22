import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form"
import type { TypeTodoSchema } from "../schemas/todo.schema"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"

type Props = {
    control: Control<TypeTodoSchema>,
    register: UseFormRegister<TypeTodoSchema>,
}

const CheckList = ({ control, register }: Props) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'checkList'
    })

    return (
        <div className="p-4">
            <h3>CheckList</h3>

            {fields.map((field, index) => (
                <div key={field.id} className="p-2 flex justify-between gap-2">
                    <Input type="text" className="border-none hover:border-none
                    focus:border-transparent focus:outline-none w-full"
                        {...register(`checkList.${index}.text`)} />

                    <Button variant='ghost'
                        onClick={() => remove(index)}>
                        <Trash2 />
                    </Button>
                </div>
            ))}

            <Button type="button" variant='secondary'
                onClick={() => append({ text: '', completed: false })}>
                +
            </Button>
        </div>
    )
}

export default CheckList