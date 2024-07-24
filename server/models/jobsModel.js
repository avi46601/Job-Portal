import mongoose, { Schema, model } from "mongoose";


const jobSchema = new Schema({

    company: { type: Schema.Types.ObjectId, ref: "Companies" },
    jobTitle: { type: String, required: [true, "Job Title in required"] },
    jobType: { type: String, required: [true, "Job Type in required"] },
    location: { type: String, required: [true, "Location in required"] },
    salary: { type: Number, required: [true, "Salary in required"] },
    vacancies: { type: Number },
    experience: { type: Number, default: 0 },
    detail: [{ desc: { type: String },requirements: { type: String } }],

    applications: { type: Schema.Types.ObjectId, ref: "users" }
},
    { timestamps: true }
)


const Jobs = model('Jobs', jobSchema);

export default Jobs