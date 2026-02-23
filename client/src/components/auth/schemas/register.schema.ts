import z from "zod";

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Incorrect email'
    }),
    password: z.string().min(6, {
        message: 'Password min 6 symbols'
    }),
    passwordRepeat: z.string().min(6, {
        message: 'Confirm password min 6 symbols'
    })
}).refine(data => data.password === data.passwordRepeat, {
    message: 'passwords do not match',
    path: ['passwordRepeat']
})

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>