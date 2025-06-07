import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    password: {
        type: String,
        required: false,
        minlength: 6,
        maxlength: 100
    },
    googleId: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);