import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import morgan from 'morgan';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import createDbConnection from './config/dbconfig.js';

import authRouter from './router/authRouter.js';
import userRouter from './router/userRouter.js';
import companiesRouter from './router/companiesRouter.js';
import jobRouter from './router/jobRouter.js';

import errorMiddleware from './middleware/errorMiddleware.js'

dotenv.config();

const app= express();

//MongoDb connection
createDbConnection();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:"true"}))

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:"true"}))

app.use(xss());
app.use(mongoSanitize());
app.use(morgan("dev"));


//Router Start From Here

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/companies",companiesRouter)
app.use("/api/jobs",jobRouter)

app.use(errorMiddleware)


const PORT = process.env.PORT || 8000 

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})