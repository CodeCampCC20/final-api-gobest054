import express from "express"
import { loginDoctor, loginUser, registerDoctor, registerUser } from "../controllers/authController.js"

const router = express.Router()
router.post("/register/doctor", registerDoctor)
router.post("/register/user",registerUser)
router.post("/login/doctor", loginDoctor)
router.post("/login/user", loginUser)


export default router