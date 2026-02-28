import path from 'path';
import { readDB, writeDB } from './connectToDB.js';
import { randomUUID } from 'crypto';
import type { newOrderInt } from "../../controllers/orders-controllers.js";
import { getAllFoodId } from './food.store.js';
import { getAllUsersId } from './users.store.js';

const DB_PATH = path.join(process.cwd(), 'src', 'db', 'orders.json')

export async function fetchOrders(id: string) {
    const ordersObject = await readDB(DB_PATH)
    if (Object.keys(ordersObject).length === 0) {
        return false
    }
    const { user_id, items, total_amount, status, created_at } = ordersObject[id]
    return { user_id, items, total_amount, status, created_at }
}

export async function createOrder(order: newOrderInt) {
    const userIds = await getAllUsersId()
    const foodIds = await getAllFoodId()
    if (!userIds.includes(order.user_id)) {
        return 'user'
    }
    if (!Object.keys(order.items).every(key => foodIds.includes(key))) {
        return 'food'
    } 
    const ordersObject = await readDB(DB_PATH)
    const uuid = randomUUID()
    const total_amount = order.items.reduce((accumulator, item) => {
        return item['price_at_time'] + accumulator
    }, 0)
    ordersObject[uuid] = {id: uuid, ...order, total_amount, status: "pending", created_t: new Date().toISOString()}
    await writeDB(DB_PATH, ordersObject)
    return {id: uuid, ...order, total_amount, status: "pending", created_t: new Date().toISOString()}
}