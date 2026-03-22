import { useForm } from "react-hook-form"
import AuthWrapper from "./AuthWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../ui/input"
import { useRef, useState } from "react"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { useLoginMutation } from "../hooks/useLoginMutation"
import { LoginSchema, type TypeLoginSchema } from "../schemas/login.schema"
import { Link } from "@tanstack/react-router"
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from "sonner"
import { useWindowSize } from '@uidotdev/usehooks'
import { useRecaptchaSize } from "../hooks/useRecaptchaSize"

const LoginForm = () => {
    const recaptchaRef = useRef<ReCAPTCHA>(null)

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
        const token = recaptchaRef.current?.getValue()
        if (token) {
            login({ values, recaptcha: token })
            recaptchaRef.current?.reset()
        }
        else toast.error('Please, continue ReCaptcha')
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
                            <div className="flex items-center justify-between">
                                <FieldLabel htmlFor="password">Password</FieldLabel>

                                <Link
                                    to='/reset-password'
                                    className="ml-auto inline-block text-sm underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                disabled={isLoadingLogin}
                                {...form.register('password')}
                                minLength={6}
                                placeholder="******" />
                        </Field>

                        <div className="flex justify-center items-center">
                            {/* If the user rotates their phone, 
                        the size will change, and the CAPTCHA will also resize */}
                            <ReCAPTCHA ref={recaptchaRef} size={useRecaptchaSize()} key={useRecaptchaSize()}
                                sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_KEY as string} />
                        </div>
                    </FieldGroup>

                }
                <Button type='submit'>Sign in</Button>
            </form>
        </AuthWrapper>
    )
}

export default LoginForm 