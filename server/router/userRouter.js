import express from 'express'
import { updateUser ,getUser } from '../controller/userController.js';
import userAuth from '../middleware/authMiddleware.js'
const userRouter =express.Router();

// GET user
userRouter.post("/get-user", userAuth, getUser);

// UPDATE USER || PUT
userRouter.put("/update-user", userAuth, updateUser);

export default userRouter

