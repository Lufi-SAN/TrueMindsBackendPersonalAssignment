import path from 'path';
import { readDB, writeDB } from './connectToDB.js';
import { randomUUID } from 'crypto';

const DB_PATH = path.join(process.cwd(), 'src', 'db', 'foods.json')

export async function getAllFoodId() {
    const foodObject = await readDB(DB_PATH)
    return Object.keys(foodObject)
}

export async function getAllFood() {
    const foodObject = await readDB(DB_PATH)
    return Object.values(foodObject).filter(val => val.available).map(val => val.name)
}

export async function addFoodItemDB(name: String, price: Number, stock: Number, available: Boolean) {
    const foodObject = await readDB(DB_PATH)
    if (Object.values(foodObject).map(val => val.name).includes(name)) {
        return false
    } else {
        const uuid = randomUUID();
        foodObject[uuid] = {
            id: uuid,
            price,
            stock,
            available
        }
        await writeDB(DB_PATH, foodObject)
        return {id: uuid, price, stock, available}
    }
}