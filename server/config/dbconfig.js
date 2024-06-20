import mongoose from "mongoose";

const createDbConnection =()=>{
    mongoose.connect(process.env.MONGODB ).then(()=>{
        console.log("DB Connected Successfully");
    }).catch((error)=>{
        console.log("Error in DB Connnection :", error);
    })
}

export default createDbConnection