import { z } from "zod";
import { buildLinks } from "../utils/hateoasLinksBuilder.js";
import { type Request, type Response, type NextFunction,  } from "express";
import { BadRequestError, InvalidUserFormCredentials } from "../domain/user/user.errors.js";

export function validateInput(schema: z.ZodType, linkArray : [[],[]] | [{ rel: string, path: string, method: string }[],{ rel: string, path: string, method: string }[]] ) {
    return function (req: Request, res: Response, next: NextFunction) {
        const parseResult = schema.safeParse(req.body)
        if(!parseResult.success) {
            const isStructural = parseResult.error.issues.some(issue =>
                issue.code === 'invalid_type' ||
                issue.code === 'invalid_union' ||
                issue.code === 'unrecognized_keys'
            )
            if(isStructural) {
                res.locals.errLinks = buildLinks(req, linkArray[0])
                const whatPath = req.baseUrl.split('/')[2]
                return next(new BadRequestError(`Malformed ${whatPath} data`)) 
            } else {
                res.locals.errLinks = buildLinks(req, linkArray[1])
                return next(new InvalidUserFormCredentials('Invalid request body data'))
            }
        }
    }
}