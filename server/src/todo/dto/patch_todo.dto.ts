import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";


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
}