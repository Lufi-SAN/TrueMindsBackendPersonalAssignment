import { fetchOrders } from "../store/orders.store.js";
import { OrderDoesNotExist } from "../../domain/order/order.errors.js";

export async function fetchOrderService(id: string) {
    try {
        const result = await fetchOrders(id)
        if(!result) {
            throw new OrderDoesNotExist('This order does not exist')
        } 
        return result
    } catch (err) {
        throw err
    }
}