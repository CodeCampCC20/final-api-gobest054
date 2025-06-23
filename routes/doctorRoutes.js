import express from  "express"
import { getMe } from "../controllers/usersController.js"
import { doctorCheck } from "../middlewares/doctorMiddleware.js"
import { getDoctor, updateDoctor } from "../controllers/doctorController.js"

const router = express.Router()
router.get("/me",doctorCheck,getDoctor )
router.patch("/me",doctorCheck,updateDoctor)


export default router