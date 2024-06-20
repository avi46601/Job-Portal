import mongoose, { Schema, model } from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken'
const companySchema = new Schema({
    name: {
        type: String,
        required: [true, "company name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: [6, "password must be of 6 digit"],
        select: true
    },
    contact: {
        type: String
    },
    location: {
        type: String
    },
    about: {
        type: String
    },
    profielURL: {
        type: String
    },
    jobPosts: [{ type: Schema.Types.ObjectId, ref: "Jobs" }]

})


const Companies = model('Companies', companySchema)

export default Companies