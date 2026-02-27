import { z } from 'zod'

export const postMenuSchema = z.object({
    name: z.string().trim(),
    price: z.coerce.number().min(1),
    stock: z.coerce.number().min(1),
    available: z.boolean() 
})