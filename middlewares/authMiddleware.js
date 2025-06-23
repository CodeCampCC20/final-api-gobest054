import { createError } from "../utils/createErorr"

export const authCheck = (req, res, next)=>{
  try {
    const header = req.header.authorization
    if(!header){
      createError(401, "Token is missing!!");
    }
    const token = header.split("")[1]
    jwt.verify 
  } catch (error) {
    
  }
}