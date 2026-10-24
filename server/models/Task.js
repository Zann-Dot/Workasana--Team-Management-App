import { model, Schema } from "mongoose";

const taskSchema = new Schema(
    {
        name: { type: String, required: true },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        team: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },
        owners: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        tags: [{ type: String }],
        timeToComplete: { type: Number, required: true },
        status: {
            type: String,
            enum: ["todo", "inProgress", "completed", "blocked"],
            default: "todo",
        },
    },
    { timestamps: true },
);

const Tasks = model("tasks", taskSchema);
export default Tasks;
