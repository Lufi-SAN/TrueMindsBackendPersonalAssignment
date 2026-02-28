import type { newOrderInt } from "../../controllers/orders-controllers.js";
import { createOrder } from "../store/orders.store.js";
import { OrderIdConflict } from "../../domain/order/order.errors.js";

export async function createOrderService(newOrder: newOrderInt) {
    try {
        const result = await createOrder(newOrder)
        if (result === 'user') {
            throw new OrderIdConflict('User id does not exist')
        } 
        if (result === 'food') {
            throw new OrderIdConflict('Food id does not exist')
        }
        return result
    } catch (err) {
        throw err
    }
}