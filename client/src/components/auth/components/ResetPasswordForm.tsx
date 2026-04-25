import { useForm } from "react-hook-form"
import { useResetPasswordMutation } from "../hooks/useResetPasswordMutation"
import AuthWrapper from "./AuthWrapper"
import { ResetPasswordSchema, type TypeResetPasswordSchema } from "../schemas/reset-password.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import ReCAPTCHA from "react-google-recaptcha"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { useRecaptchaSize } from "../hooks/useRecaptchaSize"

export const ResetPasswordForm = () => {
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    const form = useForm<TypeResetPasswordSchema>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: ''
        }
    })

    const { reset, isLoadingReset } = useResetPasswordMutation()

    const onSubmit = (values: TypeResetPasswordSchema) => {
        const token = recaptchaRef.current?.getValue()
        if (token) {
            reset({ values, recaptcha: token })
            recaptchaRef.current?.reset()
        }
        else toast.error('Please, continue ReCaptcha')
    }

    return (
        <div>
            <AuthWrapper
                heading="Reset password"
                description="To reset password, enter your email"
                backButtonLabel="Login to account"
                backButtonHref="/login">
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
                        {/* If the user rotates their phone, 
                        the size will change, and the CAPTCHA will also resize */}
                        <ReCAPTCHA ref={recaptchaRef} size={useRecaptchaSize()} key={useRecaptchaSize()}
                            sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_KEY as string} />
                    </div>

                    <Button type='submit' disabled={isLoadingReset}>Reset</Button>
                </form>
            </AuthWrapper>
        </div>
    )
}

export default ResetPasswordForm