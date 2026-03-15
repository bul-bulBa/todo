import { useForm } from "react-hook-form"
import { useResetPasswordMutation } from "../hooks/useResetPasswordMutation"
import AuthWrapper from "./AuthWrapper"
import { ResetPasswordSchema, type TypeResetPasswordSchema } from "../schemas/reset-password.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const ResetPasswordForm = () => {

    const form = useForm<TypeResetPasswordSchema>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: ''
        }
    })

    const { reset, isLoadingReset } = useResetPasswordMutation()

    const onSubmit = (values: TypeResetPasswordSchema) => {
        reset(values.email)
    }

    return (
        <div>
            <AuthWrapper
                heading="Reset password"
                description="To reset password, enter your email"
                backButtonLabel="Login to account"
                backButtonHref="/auth/login">
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-2 space-y-2">

                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    disabled={isLoadingReset}
                                    {...form.register('email')}
                                    placeholder="example@gmail.com" />
                            </Field>
                        </FieldGroup>

                    
                    <Button type='submit' disabled={isLoadingReset}>Reset</Button>
                </form>
            </AuthWrapper>
        </div>
    )
}

export default ResetPasswordForm