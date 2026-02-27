import { Router } from "express"
import { validateInput } from "../middleware/validateInput.js"
import { signupSchema, verifySchema } from "./schemas/user-schema.js"
import { checkUserExists } from "../middleware/checkUserExists.js"
import { userControllers } from "../controllers/user-controllers.js"

const userRouter = Router()
const linkArray1 = {
    1: [{ rel: 'user', path: '/v1/user/signup', method: 'POST'}],
    2: [{ rel: 'user', path: '/v1/user/signup', method: 'POST'}]
}

const linkArray2 = {
    1: [{ rel: 'user', path: '/v1/user/verify', method: 'POST'}],
    2: [{ rel: 'user', path: '/v1/user/verify', method: 'POST'}]
}

userRouter.post('signup', validateInput(signupSchema, linkArray1), checkUserExists('signup'), userControllers.createNewUser )
userRouter.post('verify', validateInput(verifySchema, linkArray2), checkUserExists('verify'), userControllers.verifiedMessage )

export default userRouter 