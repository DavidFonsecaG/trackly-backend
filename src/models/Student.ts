import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    applicationType: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    term: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    program: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    schedule: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    status: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);