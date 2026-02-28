import express, { type Request, type Response, type NextFunction} from 'express'
import path from 'path'
import { checkDBExists } from './utils/checkDBExists.js'
import { createDefaultData } from './utils/createDefaultData.js'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { prototypePollutionCheck } from './middleware/prototypePollution.js'
import { buildLinks } from './utils/hateoasLinksBuilder.js'
import userRouter from './routes/user.js'
import menuRouter from './routes/menu.js'
import ordersRouter from './routes/orders.js'
import { isDomainError } from './domain/shared.js'
import { errorData, ErrorJSON } from './errors/errorJSONBuilder.js'
import { errorTypesMapping, type ErrorTypesMappingProps } from './errors/error-mapping.js'

const app = express();
const v1ApiRouter = express.Router();
app.disable('x-powered-by');

(async () => {
    try {
        //check filesystem if db exists; if not fill it up with defaultData
        const dbPath = path.join(process.cwd(), 'src', 'db')
        if (checkDBExists(dbPath)) {//if true, that means string & db folder was just created
            createDefaultData()
        }
        
        app.use(helmet())
        app.use(rateLimit({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            standardHeaders: true,
            legacyHeaders: false,
            handler: (req, res, next, options) => {
                const path = req.originalUrl;
                const errorD = errorData(...errorTypesMapping[429] as ErrorTypesMappingProps, options.message, path )
                const errorJSON = new ErrorJSON(undefined, errorD, undefined)
                res.status(options.statusCode).json(errorJSON.toJSON())
            }
        }))
        app.use(express.json())
        
        app.use((req, res, next) => {
            prototypePollutionCheck(req.body)
            prototypePollutionCheck(req.query)
            next()
        })
        
        app.use((req, res, next) => {
            res.locals.defaultErrLinks = buildLinks(req, []);
            next();
        })
        
        v1ApiRouter.use('user', userRouter)
        v1ApiRouter.use('menu', menuRouter)
        v1ApiRouter.use('orders', ordersRouter)
        app.use('v1', v1ApiRouter)

        app.use((req : Request, res : Response, next : NextFunction) => {
            const code = 404
            const path = req.originalUrl;
            const errorD = errorData(...errorTypesMapping[code] as ErrorTypesMappingProps, "Resource could not be found on server", path )
            const errorJSON = new ErrorJSON(undefined, errorD, res.locals.defaultErrLinks);
            res.status(code).json(errorJSON.toJSON());
        })

        app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
            let code = 500
            const path = req.originalUrl;
            let errorD;

            if(isDomainError(err)) {
                code = err.code
                const message = err.message
                errorD = errorData(...errorTypesMapping[code] as ErrorTypesMappingProps, message, path)
            } else {
                errorD = errorData(...errorTypesMapping[500] as ErrorTypesMappingProps, 'An unexpected error occurred on the server.', path)
            }

            const errorJSON = new ErrorJSON(undefined, errorD, res.locals.errLinks || res.locals.defaultErrLinks || {});
            res.status(code).json(errorJSON.toJSON());
        })

        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
})()