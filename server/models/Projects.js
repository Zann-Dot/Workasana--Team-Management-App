import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        teamId: {
            type: mongoose.Types.ObjectId,
            ref: "Teams",
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["inprogress", "completed", "inreview"],
            default: "inprogress",
        },
        dueOn: {
            type: Date,
            required: true,
        },
        priority: {
            type: String,
            required: true,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        description: { type: String },
        completedAt: { type: Date }
    },
    { timestamps: true },
);

const Projects = mongoose.model("Project", projectSchema);
export default Projects;
