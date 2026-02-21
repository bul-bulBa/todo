import { IsNotEmpty, IsString } from "class-validator";

export class EmailConfirmationDto {

    @IsString({message: 'token must be string'})
    @IsNotEmpty({message: 'token is required'})
    token: string
}