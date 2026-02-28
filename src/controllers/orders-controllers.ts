import { type Request, type Response, type NextFunction } from "express";
import { fetchOrderService } from "../app/services/fetchOrderService.js";
import { SuccessJSON } from "../utils/successJSONBuilder.js";
import { createOrderService } from "../app/services/createOrderService.js";

export interface getOrderForm {
    id: string
}

export interface newOrderInt {
    user_id: string,
    items: {food_id: string, quantity: number, price_at_time: number}[]
}

export const ordersControllers = {
    async fetchOrderDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.validated as getOrderForm
            const result = await fetchOrderService(id)
            if(result) {
                res.status(200).json(new SuccessJSON('success', 'Here is your order', result, undefined, {}))
            }
        } catch(err) {
            next(err)
        }
    },
    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const newOrder = req.validated as newOrderInt
            const result = await createOrderService(newOrder)
            if(Object.prototype.toString.call(result) === '[object Object]') {
                res.status(201).json(new SuccessJSON('success', 'New order created', result, undefined, {}))
            }
        } catch(err) {
            next(err)
        }
    }
}