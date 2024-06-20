import express from 'express';
import { register,login } from '../controller/authController.js';
import { rateLimit } from "express-rate-limit";

const authRouter =express.Router()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

authRouter.post('/register',limiter, register)
.post('/login',login)


export default authRouter