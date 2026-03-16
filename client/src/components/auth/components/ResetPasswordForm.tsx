import { useForm } from "react-hook-form"
import { useResetPasswordMutation } from "../hooks/useResetPasswordMutation"
import AuthWrapper from "./AuthWrapper"
import { ResetPasswordSchema, type TypeResetPasswordSchema } from "../schemas/reset-password.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import ReCAPTCHA from "react-google-recaptcha"
import { useState } from "react"
import { toast } from "sonner"

export const ResetPasswordForm = () => {
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

    const form = useForm<TypeResetPasswordSchema>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: ''
        }
    })

    const { reset, isLoadingReset } = useResetPasswordMutation()

    const onSubmit = (values: TypeResetPasswordSchema) => {
        if (recaptchaValue) reset({ values, recaptcha: recaptchaValue })
        else toast.error('Please, continue ReCaptcha')
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

                    <div className="flex justify-center items-center">
                        <ReCAPTCHA sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_KEY as string}
                            onChange={token => setRecaptchaValue(token)} />
                    </div>

                    <Button type='submit' disabled={isLoadingReset}>Reset</Button>
                </form>
            </AuthWrapper>
        </div>
    )
}

export default ResetPasswordForm