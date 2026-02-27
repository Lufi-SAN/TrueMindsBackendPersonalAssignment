import { Router } from "express"
import { verifyRateLimit } from "../middleware/verifyRateLimit.js"

const userRouter = Router()

userRouter.post('signup', userControllers.validateInput, userControllers.checkUserExists, userControllers.createNewUser )
userRouter.post('verify', verifyRateLimit, userControllers.validateInput, userControllers.checkUserExists, userControllers.verifiedMessage )

export default userRouter 