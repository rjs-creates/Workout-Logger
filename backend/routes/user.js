import express from "express"
import { loginUser, signUpUser } from "../controllers/userController.js"

const userRouter = express.Router()

//login route
userRouter.post('/login', loginUser)

//signup route
userRouter.post('/signup', signUpUser)

export default userRouter