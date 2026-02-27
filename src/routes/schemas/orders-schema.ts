import { z } from "zod"

const itemSchema = z.object({
    food_id: z.string().trim(),
    quantity: z.coerce.number().min(1),
    price_at_time: z.coerce.number().min(1)
})

export const postOrdersSchema = z.object({
    user_id: z.string().trim(),
    items: z.array(itemSchema)
})

export const getOrdersSchema = z.object({
    id: z.string().trim()
})