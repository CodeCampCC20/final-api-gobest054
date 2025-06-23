import express from  "express"
import { getMe, updateUser } from "../controllers/usersController.js"
import { authCheck } from "../middlewares/authMiddleware.js"

const router = express.Router()
router.get("/me",authCheck,getMe )
router.patch("/me",authCheck,updateUser)

export default router