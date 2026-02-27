import { z } from "zod";
import { buildLinks } from "../utils/hateoasLinksBuilder.js";
import { type Request, type Response, type NextFunction,  } from "express";
import { BadRequestError, InvalidUserFormCredentials } from "../domain/user/user.errors.js";

export type linkArray = {
    1: { rel: string; path: string; method: string }[],
    2: { rel: string; path: string; method: string }[]
}

export function validateInput(schema: z.ZodType, linkArray : linkArray, query: boolean = false) {
    return function (req: Request, res: Response, next: NextFunction) {
        let where = req.body
        if (query) where = req.query 
        const parseResult = schema.safeParse(where)
        if(!parseResult.success) {
            const isStructural = parseResult.error.issues.some(issue =>
                issue.code === 'invalid_type' ||
                issue.code === 'invalid_union' ||
                issue.code === 'unrecognized_keys'
            )
            if(isStructural) {
                res.locals.errLinks = buildLinks(req, linkArray[1])
                const whatPath = req.baseUrl.split('/')[2]
                return next(new BadRequestError(`Malformed ${whatPath} data`)) 
            } else {
                res.locals.errLinks = buildLinks(req, linkArray[2])
                return next(new InvalidUserFormCredentials('Invalid request body data'))
            }
        } else {
            req.validated = parseResult.data as Record<string, any>
            next()
        }
    }
}