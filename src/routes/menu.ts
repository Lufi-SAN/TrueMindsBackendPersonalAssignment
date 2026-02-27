import { Router } from "express"
import { requireRole } from "../middleware/requireRole.js"
import { validateInput } from "../middleware/validateInput.js"
import { postMenuSchema } from "./schemas/menu-schema.js"
import { menuControllers } from "../controllers/menu-controllers.js"

const menuRouter = Router()

const linkArray = {
    1: [{ rel: 'menu', path: '/v1/menu/foods', method: 'POST'}],
    2: [{ rel: 'menu', path: '/v1/menu/foods', method: 'POST'}]
}

menuRouter.get('foods', menuControllers.getFoodFromDB )
menuRouter.post('foods', requireRole, validateInput(postMenuSchema,linkArray), menuControllers.addFoodItem )

export default menuRouter 