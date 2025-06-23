import express from "express"
import cors from "cors"
import morgan  from "morgan"
import authRouter from "./routes/auth_user_routes.js"
import userRouter from "./routes/usersRoutes.js"
import doctorRouter from "./routes/doctorRoutes.js"

const app = express()
app.use(express.json())

app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/doctor",doctorRouter)

const PORT = 8000
app.listen(PORT, ()=>{
  console.log(`Server is running on port http://localhost:${PORT}`)
})