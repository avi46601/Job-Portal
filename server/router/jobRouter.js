import express from "express";
import userAuth from "../middleware/authMiddleware.js";

import {
    createJob,
    deleteJobPost,
    getJobById,
    getJobPosts,
    updateJob,
} from "../controller/jobController.js";

const jobRouter = express.Router();

// POST JOB
jobRouter.post("/upload-job", userAuth, createJob);

// IPDATE JOB
jobRouter.put("/update-job/:jobId", userAuth, updateJob);

// GET JOB POST
jobRouter.get("/find-jobs", getJobPosts);
jobRouter.get("/get-job-detail/:id", getJobById);

// DELETE JOB POST
jobRouter.delete("/delete-job/:id", userAuth, deleteJobPost);

export default jobRouter;
