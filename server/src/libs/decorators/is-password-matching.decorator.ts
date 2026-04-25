import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { argsArgArrayOrObject } from "rxjs/internal/util/argsArgArrayOrObject";
import { RegisterDto } from "@/auth/dto/register.dto";


@ValidatorConstraint({ name: 'IsPasswordMatching', async: false })
export class IsPasswordsMatchingConstraint
    implements ValidatorConstraintInterface {

    validate(passwordRepeat: string, args?: ValidationArguments): boolean {
        const obj = args?.object as RegisterDto
        return obj.password === passwordRepeat
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'password do not match'
    }
}