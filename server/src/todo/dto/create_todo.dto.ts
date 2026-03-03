import { IsNotEmpty, IsString } from "class-validator";

export class createTodoDto{
    
    @IsString({ message: 'text must be a string'})
    @IsNotEmpty({ message: 'text is required'})
    text: string
}