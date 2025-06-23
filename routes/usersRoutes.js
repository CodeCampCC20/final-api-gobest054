import express from  "express"
import { getMe } from "../controllers/usersController.js"

const router = express.Router()
router.get("/me",getMe )

export default router