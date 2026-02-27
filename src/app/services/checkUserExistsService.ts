import { getUserPhone } from "../store/users.store.js";
import { UserAlreadyExists, UserDoesNotExist } from "../../domain/user/user.errors.js";

export async function checkUserExistsService(phoneNumber: string, type: 'signup' | 'verify') {
    try {
        const result = await getUserPhone(phoneNumber)
        if(result && type === 'signup') {
            throw new UserAlreadyExists('User already exists')
        } 
        if(!result && type === 'verify') {
            throw new UserDoesNotExist('User does not exist')
        }
        return true
    } catch(err) {
        throw err
    }
} 