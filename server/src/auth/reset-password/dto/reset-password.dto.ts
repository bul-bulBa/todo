import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {

    @IsNotEmpty({message: 'email is required'})
    @IsEmail({}, { message: 'Enter correct email address' })
    email: string
}