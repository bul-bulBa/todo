import z from "zod";

export const ResetPasswordSchema = z.object({
    email: z.string().email({
        message: 'Incorrect email'
    })
})

export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>