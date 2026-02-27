import path from 'path';
import { readDB, writeDB } from './connectToDB.js';
import { randomUUID } from 'crypto';

const DB_PATH = path.join(process.cwd(), 'src', 'db', 'users.json')

export async function getAllUsersId() {
    const usersObject = await readDB(DB_PATH)
    return Object.keys(usersObject)
}

export async function getUserPhone(phone: string) {
    const usersObject = await readDB(DB_PATH)
    return Object.values(usersObject).some(val => val.phone === phone)
}

export async function createUser(name: string, phone: string, role: string) {
    const usersObject = await readDB(DB_PATH)
    const uuid = randomUUID();
    usersObject[uuid] = {
        id: uuid,
        name: name,
        phone,
        role,
        created_at: new Date().toISOString()
    }
    return await writeDB(DB_PATH, usersObject)
}