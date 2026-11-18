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
            required: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
            required: true,
        },
        priorityWeight: {
            type: Number,
            default: 2,
        },
        dueDate: { type: Date, required: true },
        completedAt: { type: Date },
    },
    { timestamps: true },
);

taskSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate();
    const priority = update.priority || (update.$set && update.$set.priority);

    if (priority) {
        const weight = { high: 1, medium: 2, low: 3 };
        const calculateWeight = weight[priority] || 2;
        if (!update.$set) {
            update.$set = {};
        }
        update.$set.priorityWeight = calculateWeight;
        if (update.priority) {
            delete update.priority;
        }

        this.setUpdate(update);
    }
});

taskSchema.pre("save", async function () {
    if (this.dueDate) return;
    this.dueDate = new Date(
        this.createdAt.getFullYear(),
        this.createdAt.getMonth(),
        this.createdAt.getDate() + this.timeToComplete,
    );

    const weight = { high: 1, medium: 2, low: 3 };
    this.priorityWeight = weight[this.priority] || 2;
});

const Tasks = model("tasks", taskSchema);
export default Tasks;
