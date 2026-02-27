import { isDomainError } from "../domain/shared.js"
import { checkUserExistsService } from "../app/services/checkUserExistsService.js"
import { type Request, type Response, type NextFunction } from "express"

export function checkUserExists(type: 'signup' | 'verify') {
    return async function (req: Request, res: Response, next: NextFunction) {
        const phoneNumber = req.validated?.phone
        try {
            const result = await checkUserExistsService(phoneNumber, type)
            if (result) next()
        } catch(err) {
            
        }
    }
}