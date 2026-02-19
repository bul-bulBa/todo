import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    
    @IsString({message: 'email must be string'})
    @IsEmail({}, {message: 'incorrect email format'})
    @IsNotEmpty({ message: 'email is required'})
    email: string

    @IsBoolean({ message: 'IsTwoFactorEnabled must be boolean'})
    isTwoFactorEnabled: boolean
}