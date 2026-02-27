import { Router } from "express"
import { requireRole } from "../middleware/requireRole.js"

const menuRouter = Router()

menuRouter.get('foods', menuControllers.getFoodFromDB )
menuRouter.post('foods', requireRole, menuControllers.validateInput, menuControllers.addFoodItem )

export default menuRouter 