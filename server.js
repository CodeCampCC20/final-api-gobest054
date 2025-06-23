import express from "express"
import cors from "cors"
import morgan  from "morgan"
import authRouter from "./routes/auth_user_routes.js"
import userRouter from "./routes/usersRoutes.js"

const app = express()
app.use(express.json())

app.use("/auth",authRouter)
app.use("/users",userRouter)

const PORT = 8000
app.listen(PORT, ()=>{
  console.log(`Server is running on port http://localhost:${PORT}`)
})