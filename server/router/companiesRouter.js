import express, { Router } from "express";
import { rateLimit } from "express-rate-limit";

import {
    getCompanies,
    getCompanyById,
    getCompanyJobListing,
    getCompanyProfile,
    register,
    signIn,
    updateCompanyProfile,
} from "../controller/companyController.js";

import userAuth from "../middleware/authMiddleware.js"

const companiesRouter = express.Router();

//ip rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// REGISTER
companiesRouter.post("/register", limiter, register);

// LOGIN
companiesRouter.post("/login", limiter, signIn);

// GET DATA
companiesRouter.post("/get-company-profile", userAuth, getCompanyProfile)
.post("/get-company-joblisting", userAuth, getCompanyJobListing)
.get("/", getCompanies)
.get("/get-company/:id", getCompanyById);

// UPDATE DATA
companiesRouter.put("/update-company", userAuth, updateCompanyProfile);

export default companiesRouter;
