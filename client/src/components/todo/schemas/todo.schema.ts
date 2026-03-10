import z from "zod";

const checkListItemSchema = z.object({
    text: z.string(),
    order: z.number().optional(),
    completed: z.boolean()
})

export type TypeCheckListItemSchema = z.infer<typeof checkListItemSchema>

export const todoSchema = z.object({
    text: z.string(),
    complete: z.optional(z.boolean()),
    deadline: z.optional(z.date()),
    checkList: z.array(checkListItemSchema)
})

export type TypeTodoSchema = z.infer<typeof todoSchema>