import { createUser } from "../store/users.store.js"

export async function createUserService(userDetails : {name: string, phone: string, role: string}) {
    try {
        return await createUser(userDetails.name, userDetails.phone, userDetails.role)
    } catch(err) {
        throw err
    }
}