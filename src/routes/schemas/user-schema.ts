import { z } from "zod"

export const signupSchema = z.object({
    name: z.string().trim().min(3),
    phone: z.string().trim().length(11),
    role: z.enum(['user', 'admin'])
})

export const verifySchema = z.object({
    phone: z.string().trim().length(11),
    role: z.enum(['user', 'admin']) 
})