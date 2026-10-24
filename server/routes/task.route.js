import express from "express";
import validatePayload from "../middleware/validatePayload.js";
import Tasks from "../models/Task.js";
const taskRouter = express.Router();

taskRouter.post("/tasks", validatePayload, async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

export default taskRouter;
