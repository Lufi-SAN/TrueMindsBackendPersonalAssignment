import { type Request, type Response, type NextFunction } from "express";
import { SuccessJSON } from "../utils/successJSONBuilder.js";
import { buildMeta } from "../utils/metaDataBuilder.js";
import { createUserService } from "../app/services/createUserService.js";

export const userControllers = {
    async createNewUser(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await createUserService(req.validated)
            if(result) {
                const meta = buildMeta(req)
                res.status(201).json(new SuccessJSON("success", 'You have been added', undefined, undefined, meta))
            } 
        } catch(err) {
            next(err)
        }
    },
    verifiedMessage(req: Request, res: Response, next: NextFunction) {
        const meta = buildMeta(req)
        res.status(200).json(new SuccessJSON("success", 'You have been verified', undefined, undefined, meta ))
    }
}