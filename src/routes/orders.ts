import { Router } from "express"
import { ordersRateLimit } from "../middleware/ordersRateLimit.js"

const ordersRouter = Router()

ordersRouter.get('/:id', validateInput(), ordersControllers.verifyIdentity, ordersControllers.fetchOrerDetails )
ordersRouter.post('/', ordersRateLimit, validateInput(), ordersControllers.createOrder )

export default ordersRouter 