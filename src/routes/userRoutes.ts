import express from "express";
import prisma from "../prisma";
import {registerSchema,loginSchema} from "../validationSchemas";
import { validateBody } from "../validationMethods";

const userRouter = express.Router();

// Create a new user
userRouter.post("/register", validateBody(registerSchema), async (req, res) => {
  const { name, email, password } = req.body;
  console.log("password : "+password)
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  res.json(user);
});


userRouter.post("/login",validateBody(loginSchema),async (req,res)=>{
    const {email,password}=req.body;
    const userEmail=await prisma.user.findFirstOrThrow(email)
    console.log("userEmail : "+userEmail)
});
export default userRouter;
