import { Router } from "express";
import { Login, Logout, Register, getAllUsers, getSpecificUserAndPost } from "./users.controller.js";
import { validateEmail } from "../../middleware/Register/validateEmail.js";
import { hashPassword } from "../../middleware/Register/hashPassword.js";


const userRouter  = Router()


userRouter.get("/", getAllUsers)
userRouter.post("/register", validateEmail, hashPassword, Register)
userRouter.post("/login", Login)
userRouter.post("/logout/:user_id", Logout)
userRouter.get("/specificUserPost/:user_id/:PostId", getSpecificUserAndPost)




export default userRouter;