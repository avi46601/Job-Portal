import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required"],

    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"],

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
    accountType: {
        type: String,
        default: "seeker"
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
    jobTitle: {
        type: String
    }

}, { timestamps: true })

//middleware

userSchema.pre("save", async function (){
    this.password = await bcrypt.hash(this.password,10);
})



//compare Passwords
userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password)
    return isMatch
}



const users = mongoose.model("users", userSchema);




export default users ;