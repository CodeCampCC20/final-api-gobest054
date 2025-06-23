import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const getDoctor = async (req, res, next)=>{
  try {
    const { id } =req.user;
    console.log(id)
    const doctor = await prisma.doctor.findFirst({
      where:{
        id: Number(id),
      },
       omit: {
        password: true,
      },
    })
    res.json({
      id:doctor.id,
      username:doctor.username,
      specialization:doctor.specialization
    })
  } catch (error) {
    next(error)
  }
}

export const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {username, password, specialization} = req.body;
    let hashedPassword = undefined;
    if(password){
      const salt = await bcrypt.genSalt(10)
      hashedPassword = await bcrypt.hash(password, salt)
    }
    console.log(id);
    const doctor = await prisma.doctor.update({
      where: {
        id: req.user.id,
      },
      data: {
        username:username,
        specialization:specialization,
        ...(hashedPassword&&{password:hashedPassword})
      },
    });
    res.json({ 
      id:req.user.id,
      username:user.username,
      specialization:user.specialization,
     });
  } catch (error) {
    next(error);
  }
};