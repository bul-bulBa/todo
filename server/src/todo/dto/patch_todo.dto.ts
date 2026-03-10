import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

interface CheckListItem {
    text: string
    order: number,
    completed: boolean
}

export class PatchTodoDto {

    @IsNotEmpty({message: 'todoId is required'})
    todoId: string

    @IsOptional()
    @IsBoolean()
    complete: boolean

    @IsOptional()
    @IsBoolean()
    deadline: Date

    @IsOptional()
    @IsString()
    text: string

    @IsOptional()
    checkList: CheckListItem[]
}