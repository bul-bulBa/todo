import { useForm } from "react-hook-form"
import AuthWrapper from "./AuthWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNewPasswordMutation } from "../hooks/useNewPasswordMutation"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NewPasswordSchema, type TypeNewPasswordSchema } from "../schemas/new-password.schema"


export const NewPasswordForm = () => {
    const form = useForm<TypeNewPasswordSchema>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ''
        }
    })

    const { change, isLoadingNewPassword } = useNewPasswordMutation()

    const onSubmit = (values: TypeNewPasswordSchema) => {
        change(values.password)
    }

    return (
        <AuthWrapper
            heading="New password"
            description="create a new password"
            backButtonLabel="Login to account"
            backButtonHref="/auth/login">
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-2 space-y-2">

                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            disabled={isLoadingNewPassword}
                            {...form.register('password')}
                            placeholder="******" />
                    </Field>
                </FieldGroup>


                <Button
                    type='submit'
                    disabled={isLoadingNewPassword}>
                    Continue
                </Button>
            </form>
        </AuthWrapper>
    )
}