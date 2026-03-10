import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

interface CheckListItem {
    text: string,
    order: number
}

export class createTodoDto{
    
    @IsString({ message: 'text must be a string'})
    @IsNotEmpty({ message: 'text is required'})
    text: string

    @IsOptional()
    @IsDate()
    deadline: Date

    @IsOptional()
    checkList: CheckListItem[]
}