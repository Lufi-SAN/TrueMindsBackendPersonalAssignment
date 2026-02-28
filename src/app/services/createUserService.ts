import { createUser } from "../store/users.store.js"
export interface userDetails {
    name: string, 
    phone: string, 
    role: string
}

export async function createUserService(userDetails : userDetails) {
    try {
        return await createUser(userDetails.name, userDetails.phone, userDetails.role)
    } catch(err) {
        throw err
    }
}