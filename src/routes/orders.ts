import { Router } from "express"
import { getOrdersSchema, postOrdersSchema } from "./schemas/orders-schema.js"
import { validateInput } from "../middleware/validateInput.js"
import { ordersControllers } from "../controllers/orders-controllers.js"

const ordersRouter = Router()

const linkArray1 = {
    1: [{ rel: 'orders', path: '/v1/orders:id', method: 'GET'}],
    2: [{ rel: 'orders', path: '/v1/orders:id', method: 'GET'}]
}

const linkArray2 = {
    1: [{ rel: 'orders', path: '/v1/orders', method: 'POST'}],
    2: [{ rel: 'orders', path: '/v1/orders', method: 'POST'}]
}

ordersRouter.get('/:id', validateInput(getOrdersSchema, linkArray1, true), ordersControllers.fetchOrderDetails )
ordersRouter.post('/', validateInput(postOrdersSchema, linkArray2), ordersControllers.createOrder )

export default ordersRouter 