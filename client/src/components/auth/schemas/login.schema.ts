import z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Incorrect email'
    }),
    password: z.string().min(6, {
        message: 'Password min 6 symbols'
    })
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>