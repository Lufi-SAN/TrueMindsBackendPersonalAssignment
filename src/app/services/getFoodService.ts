import { getAllFood } from "../store/food.store.js"

export async function getFoodService() {
    try {
        const result = await getAllFood()
        if (result.length === 0) {
            return false
        } else return result
    } catch(err) {
        throw err
    }
} 