import { type Request, type Response, type NextFunction } from "express"
import { SuccessJSON } from "../utils/successJSONBuilder.js"
import { getFoodService } from "../app/services/getFoodService.js"
import { addFoodItemService } from "../app/services/addFoodItemService.js"
import { FoodAlreadyExists } from "../domain/food/food.errors.js"

export const menuControllers = {
    async getFoodFromDB(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await getFoodService()
            if(!result) {
                res.status(200).json(new SuccessJSON('success', 'No food available', undefined, undefined, {}))
            } else {
                const data = result
                res.status(200).json(new SuccessJSON('success', 'Food available', data, undefined, {}))
            }
        } catch(err) {
            next(err)
        }
    },
    async addFoodItem(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await addFoodItemService(req.validated as Record<string, any>)
            if (!result) {
                throw new FoodAlreadyExists('Food Item Alreaddy Exists')
            } else {
                const data = result
                res.status(201).json(new SuccessJSON('success', 'New Food Item added', data, undefined, {}))
            }
        } catch(err) {
            next(err)
        }
    }
}