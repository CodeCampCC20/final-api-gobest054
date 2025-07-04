import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const getMe = async (req, res, next)=>{
  try {
    const { id } =req.user;
    console.log(id)
    const user = await prisma.user.findFirst({
      where:{
        id: Number(id),
      },
       omit: {
        password: true,
      },
    })
    res.json({
      id:user.id,
      username:user.username
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {username, password} = req.body;
    let hashedPassword = undefined;
    if(password){
      const salt = await bcrypt.genSalt(10)
      hashedPassword = await bcrypt.hash(password, salt)
    }
    console.log(id);
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        username:username,
        ...(hashedPassword&&{password:hashedPassword})
      },
    });
    res.json({ 
      id:req.user.id,
      username:username,
     });
  } catch (error) {
    next(error);
  }
};