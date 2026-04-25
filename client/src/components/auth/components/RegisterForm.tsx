import { useForm } from "react-hook-form"
import AuthWrapper from "./AuthWrapper"
import { RegisterSchema, type TypeRegisterSchema } from "../schemas/register.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../ui/input"
// import ReCAPTCHA from "react-google-recaptcha"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { useRegisterMutation } from "../hooks/useRegisterMutation"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Switch } from "radix-ui"
import { Button } from "@/components/ui/button"
import ReCAPTCHA from "react-google-recaptcha"
import { useRecaptchaSize } from "../hooks/useRecaptchaSize"

const RegisterForm = () => {
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    const form = useForm<TypeRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordRepeat: ''
        }
    })

    const { register, isLoadingRegister } = useRegisterMutation()

    const onSubmit = (values: TypeRegisterSchema) => {
        const token = recaptchaRef.current?.getValue()
        if (token) {
            register({ values, recaptcha: token })
            recaptchaRef.current?.reset()
        }
        else toast.error('Please, continue ReCaptcha')
    }

    return (
        <AuthWrapper
            heading="Registration"
            description="To sign on site you must enter your email and password"
            backButtonLabel="Have an account?"
            backButtonHref="/login"
            isShowSocial>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-2 space-y-2">

                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            disabled={isLoadingRegister}
                            {...form.register('email')}
                            placeholder="example@gmail.com" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            disabled={isLoadingRegister}
                            {...form.register('password')}
                            minLength={6}
                            placeholder="******" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password-repeat">Repeat password</FieldLabel>
                        <Input
                            disabled={isLoadingRegister}
                            {...form.register('passwordRepeat')}
                            minLength={6}
                            placeholder="******" />
                    </Field>
                </FieldGroup>

                <div className="flex justify-center items-center">
                    {/* If the user rotates their phone, 
                        the size will change, and the CAPTCHA will also resize */}
                    <ReCAPTCHA ref={recaptchaRef} size={useRecaptchaSize()} key={useRecaptchaSize()}
                        sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_KEY as string} />
                </div>

                <Button type='submit'>Sign up</Button>
            </form>
        </AuthWrapper>
    )
}

export default RegisterForm 