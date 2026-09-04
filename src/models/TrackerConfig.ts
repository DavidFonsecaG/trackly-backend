import mongoose from "mongoose";

const applicationTypeSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        color: String,
        documents: [String],
    },
    { _id: false }
);

const trackerConfigSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        applicationTypes: [applicationTypeSchema],
        terms: [String],
        programs: [String],
        schedules: [String],
    },
    { timestamps: true }
);

export default mongoose.model("TrackerConfig", trackerConfigSchema);
