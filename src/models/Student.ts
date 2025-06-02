import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    applicationID: String,
    applicationType: String,
    term: String,
    program: String,
    schedule: String,
    status: String,
    lastUpdated: String
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);