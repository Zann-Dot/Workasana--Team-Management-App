import { format } from "date-fns";
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
            ref: "Teams",
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
            enum: ["todo", "inprogress", "completed", "blocked"],
            default: "todo",
        },
        dueDate: { type: string },
    },
    { timestamps: true },
);

taskSchema.pre("save", async function () {
    if (this.dueDate) return;
    const dueDate = new Date(
        this.createdAt.getFullYear(),
        this.createdAt.getMonth(),
        this.createdAt.getDate() + this.timeToComplete,
    );
    this.dueDate = format(dueDate, "MMM dd")
});

const Tasks = model("tasks", taskSchema);
export default Tasks;
