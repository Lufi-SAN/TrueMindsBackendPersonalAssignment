import { Router } from "express"
import { validateInput } from "../middleware/validateInput.js"
import { verifyRateLimit } from "../middleware/verifyRateLimit.js"
import { signupSchema, verifySchema } from "./schemas/user-schema.js"

const userRouter = Router()
const linkArray = [
    [{ rel: '', path: '', method: '' }],
    [{ rel: '', path: '', method: '' }]
]

userRouter.post('signup', validateInput(signupSchema, linkArray), checkUserExists(), userControllers.createNewUser )
userRouter.post('verify', verifyRateLimit, validateInput(verifySchema, linkArray), checkUserExists(), userControllers.verifiedMessage )

export default userRouter 