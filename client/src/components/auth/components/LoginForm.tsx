import { useForm } from "react-hook-form"
import AuthWrapper from "./AuthWrapper"
import { RegisterSchema, type TypeRegisterSchema } from "../schemas/register.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../ui/input"
// import ReCAPTCHA from "react-google-recaptcha"
import { useState } from "react"
import { toast } from "sonner"
import { useRegisterMutation } from "../hooks/useRegisterMutation"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Switch } from "radix-ui"
import { Button } from "@/components/ui/button"
import { useLoginMutation } from "../hooks/useLoginMutation"
import { LoginSchema, type TypeLoginSchema } from "../schemas/login.schema"

const LoginForm = () => {
    // const { theme } = useTheme()
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
    const [isShowTwoFactor, setIsShowTwoFactor] = useState<boolean>(false)
    const form = useForm<TypeLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { login, isLoadingLogin } = useLoginMutation(setIsShowTwoFactor)

    const onSubmit = (values: TypeLoginSchema) => {
        // if (recaptchaValue) register({ values, recaptcha: recaptchaValue })
        // else toast.error('Please, continue ReCaptcha')
        login(values)
    }

    return (
        <AuthWrapper
            heading="Login"
            description="To sign on site you must enter your email and password"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            isShowSocial>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-2 space-y-2">

                {isShowTwoFactor &&
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="code">Code</FieldLabel>
                            <Input
                                disabled={isLoadingLogin}
                                {...form.register('code')}
                                minLength={6}
                                placeholder="******" />
                        </Field>
                    </FieldGroup>
                }

                {!isShowTwoFactor &&
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                disabled={isLoadingLogin}
                                {...form.register('email')}
                                placeholder="example@gmail.com" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                disabled={isLoadingLogin}
                                {...form.register('password')}
                                minLength={6}
                                placeholder="******" />
                        </Field>
                    </FieldGroup>
                }
                <Button type='submit'>Sign in</Button>
            </form>
        </AuthWrapper>
    )
}

export default LoginForm 