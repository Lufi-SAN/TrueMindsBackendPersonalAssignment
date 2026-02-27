import { addFoodItemDB } from "../store/food.store.js"

export async function addFoodItemService(userDetails) {
    try {
        const { name, price, stock, available } = userDetails
        const result = await addFoodItemDB(name, price, stock, available)
        return result
    } catch(err) {
        throw err
    }
}