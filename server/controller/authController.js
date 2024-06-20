import users from "../models/userModel.js";
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    
    if (!(firstName && lastName && email && password)) {
        next("firstName , lastName, Email, Password are required")
    }
    try {

        //check if user already exiting

        const userExit = await users.findOne({ email });

        if (userExit) {
            return res.status(201).send("Account Already Exit")
        }

        const user = await users.create({
            firstName,
            lastName,
            email,
            password
        })

        const token = await jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, {
            expiresIn: "1d",
        })

        return res.status(201).send({
            status: "Success",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType:user.accountType
            },
            token,
        })

    } catch (error) {
          console.log(error);

          return res.status(500).json({ message: error.message });
    }

}

export const login = (req, res, next) => {

  const {email, password} =req.body;

  if(!(email && password)){
    next("Email and Password are Required")
  }

  

}