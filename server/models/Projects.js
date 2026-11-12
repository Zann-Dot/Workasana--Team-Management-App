import mongoose from "mongoose";
import { format } from "date-fns";

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
        dueDate: {
            type: String,
        },
        priority: {
            type: String,
            required: true,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        description: { type: String },
    },
    { timestamps: true },
);

projectSchema.pre("save", async function () {
    if (this.dueDate) return;
    this.dueDate = format(this.dueOn, "MMM dd");
});

const Projects = mongoose.model("Project", projectSchema);
export default Projects;
