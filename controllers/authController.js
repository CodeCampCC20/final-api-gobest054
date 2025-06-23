import prisma from "../config/prisma.js";
import { createError } from "../utils/createErorr.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerDoctor = async (req, res, next) =>{
  try {
    console.log(req.body)
    const{username, password} = req.body

   const doctor = await prisma.doctor.findFirst({
      where:{
        username:username,
      }
    });
    console.log(username)
    if(username){
      console.log("user exits")
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    const result = await prisma.doctor.create({
      data:{
        username: username,
        password:hashPassword,
        specialization: req.body.specialization
      },
    });
    res.json({message: `Register doctor Successfully`})
    console.log(result)
  } catch (error) {
    next(error)
  }
}

export const registerUser = async (req, res, next) =>{
  try {
    console.log(req.body)
    const{username, password} = req.body

   const user = await prisma.user.findFirst({
      where:{
        username:username,
      }
    });
    console.log(username)
    if(username){
      console.log("user exits")
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    const result = await prisma.user.create({
      data:{
        username: username,
        password:hashPassword,
      },
    });
    res.json({message: `Register user Successfully`})
    console.log(result)
  } catch (error) {
    next(error)
  }
}

export const loginDoctor = async(req, res, next)=>{
  try {
  
    const {username, password} = req.body;
    const doctor = await prisma.doctor.findFirst({
      where:{
        username:username,
      },
    })
    console.log(doctor)
    if(!doctor){
      
      createError(400, "Email or Password is invalid!!!");
    }
    const checkPassword = bcrypt.compareSync(password, doctor.password)
    if(!checkPassword){
      createError(400, "Email or Password is invalid!!!");
    }
    const payload = {
      id: doctor.id
    };
    console.log(process.env.SECRET_DOCTOR)
    const token = jwt.sign(payload, process.env.SECRET_DOCTOR, {expiresIn:"1d"})
    console.log("test" )
    res.json({
      id:doctor.id,
      username:doctor.username,
      specialization:doctor.specialization,
      accessToken:token
    })
    next()
 } catch (error) {
    console.log(error)
    
    next(error)
  }
}

export const loginUser = async(req, res, next)=>{
  try {
  
    const {username, password} = req.body;
    const user = await prisma.user.findFirst({
      where:{
        username:username,
      },
    })
    console.log(user)
    if(!user){
      
      createError(400, "Email or Password is invalid!!!");
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    if(!checkPassword){
      createError(400, "Email or Password is invalid!!!");
    }
    const payload = {
      id: user.id
    };
    console.log(process.env.SECRET_DOCTOR)
    const token = jwt.sign(payload, process.env.SECRET_USER, {expiresIn:"1d"})
    console.log("test" )
    res.json({
      id:user.id,
      username:user.username,
      accessToken:token
    })
    next()
 } catch (error) {
    console.log(error)
    
    next(error)
  }
}