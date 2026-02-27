import fs from 'fs'
import path from 'path'

const userData = {
    "u1": {
        "id": "u1",
        "name": "Daniel",
        "phone": "09172210882",
        "role": "admin",
        "created_at": "2026-02-25T10:00:00Z"
    },
    "u2": {
        "id": "u2",
        "name": "Sarah",
        "phone": "09172210888",
        "role": "user",
        "created_at": "2026-02-26T09:30:00Z"
    }
};
const foodData = {
  "f1": {
    "id": "f1",
    "name": "Jollof Rice",
    "price": 3500,
    "stock": 400,
    "available": true
  },
  "f2": {
    "id": "f2",
    "name": "Chicken Pie",
    "price": 1200,
    "available": true
  },
  "f3": {
    "id": "f3",
    "name": "Chapman",
    "price": 1500,
    "available": false
  }   
};
const orderData = {
    "o1": {
      "id": "o1",
      "user_id": "u2",
      "items": [
        {
          "food_id": "f1",
          "quantity": 2,
          "price_at_time": 3500
        },
        {
          "food_id": "f2",
          "quantity": 1,
          "price_at_time": 1200
        }
      ],
      "total_amount": 8200,
      "status": "pending",
      "created_at": "2026-02-26T12:15:00Z"
    }
};

export function createDefaultData(data: Record<string, any>, filename: string) {
    const outputPath = path.join(process.cwd(), 'src', 'db', filename)
    const jsonString = JSON.stringify(data, null, 2)
    try {
        fs.writeFileSync(outputPath, jsonString, 'utf-8')
        console.log(`Successfully wrote data to ${filename}`)
    } catch(err) {
        console.error('Error writing file')
        throw err
    }
}

createDefaultData(userData, 'users.json')
createDefaultData(foodData, 'foods.json')
createDefaultData(orderData, 'orders.json')