import mongoose, { Schema, model } from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const companySchema = new Schema({
    name: {
        type: String,
        required: [true, "company name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        vaildate: validator.isEmail
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

},
{timestamps:true})
//middleware

companySchema.pre("save", async function (){
    this.password = await bcrypt.hash(this.password,10);
})



//compare Passwords
companySchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password)
    return isMatch
}

//create Jwt
companySchema.methods.createJWT = async function (){
    return jwt.sign(
         { userId: this._id },
         process.env.JWT_SECRET, {
         expiresIn: "1d",
     })
 }
 


const Companies = model('Companies', companySchema)

export default Companies