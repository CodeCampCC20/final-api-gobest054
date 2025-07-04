import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js"

export const authCheck = (req, res, next)=>{
  try {
    const header = req.headers.authorization
    if(!header){
      createError(401, "Token is missing!!");
    }
    const token = header.split(" ")[1]
    jwt.verify(token, process.env.SECRET_USER,(error, decode)=>{
      if(error){
        createError(401,"Token is Invalid!!")
      }
      req.user = decode;
      next()
    })
  } catch (error) {
    next(error)
    
  }
}