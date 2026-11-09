import "dotenv/config";
import e from "express";
import cors from "cors";
import connectDB from "./db/db.connect.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.route.js";
import teamRouter from "./routes/team.route.js";
import projectRouter from "./routes/projects.route.js";
import tagsRouter from "./routes/tags.route.js";
import reportRouter from "./routes/reports.route.js";

const app = e();
const corsConfig = {
    origin: "https://workasana-app-one.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));
app.use(e.json());
app.use(cookieParser());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ error: "database connection failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Workasana Server!" });
});

app.use("/api", userRouter);
app.use("/api", taskRouter);
app.use("/api", teamRouter);
app.use("/api", projectRouter);
app.use("/api", tagsRouter);
app.use("/api", reportRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
