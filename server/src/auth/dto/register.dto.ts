import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { IsPasswordsMatchingConstraint } from "src/libs/decorators/is-password-matching.decorator";

export class RegisterDto {

    @IsString({ message: 'email must be string' })
    @IsEmail({}, { message: 'incorrect email format' })
    @IsNotEmpty({ message: 'email is required' })
    email: string

    @IsString({message: 'password must be string'})
    @IsNotEmpty({message: 'password is required'})
    @MinLength(6, {message: 'password must be at least 6 characters long'})
    password: string

    @IsString({message: 'password repeat must be string'})
    @IsNotEmpty({message: 'password repeat is required'})
    @MinLength(6, {message: 'password repeat must be at least 6 characters long'})
    @Validate(IsPasswordsMatchingConstraint, {
        message: 'password do not match'
    })
    passwordRepeat: string
}