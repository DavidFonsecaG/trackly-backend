import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    id: String,
    name: String,
    required: Boolean,
    submitted: { type: Boolean, default: null },
    submissionDate: String,
    notes: String
});

const studentDocumentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    documents: [documentSchema]
});

export default mongoose.model("StudentDocument", studentDocumentSchema);