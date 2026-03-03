import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRef } from "react"
import { useCreateMutation } from "../hooks/useCreateMutation"

const CreateTodo = () => {
    const text = useRef('')

    const {createTodo, isPendingTodo} = useCreateMutation()

    return (
        <div>
            {isPendingTodo && <div>...loading</div>}
            <Textarea placeholder="Type your todo here" onChange={(e) => text.current = e.target.value}/>
            <Button onClick={() => createTodo(text.current)}></Button>
        </div>
    )
}

export default CreateTodo