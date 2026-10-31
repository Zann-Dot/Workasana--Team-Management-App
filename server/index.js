import e from "express";
import cors from "cors";
import connectDB from "./db/db.connect.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.route.js";
import teamRouter from "./routes/team.route.js";
import projectRouter from "./routes/projects.route.js";
import tagsRouter from "./routes/tags.route.js";
const app = e();
const corsConfig = {
    origin: "*",
    credentials: true,
};
app.use(e.json());
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ error: "database connection failed" })
    }
})
const PORT = 3000;
app.get("/", (req, res) => {
    res.json({ message: "workasana server, search endpoints for data view" });
});

app.use("/api", userRouter);
app.use("/api", taskRouter);
app.use("/api", teamRouter);
app.use("/api", projectRouter);
app.use("/api", tagsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
