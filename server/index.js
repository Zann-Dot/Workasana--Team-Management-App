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

const app = e();

const allowedOrigins = [
    "https://workasana-app-one.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
];

const corsConfig = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const cleanOrigin = origin.replace(/\/$/, "");
        if (
            allowedOrigins.includes(cleanOrigin) ||
            cleanOrigin.endsWith(".vercel.app")
        ) {
            return callback(null, true);
        }
        return callback(new Error("CORS policy violation: origin not allowed"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsConfig)); ṁ
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
