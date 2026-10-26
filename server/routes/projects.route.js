import express from "express";
import validatePayload from "../middleware/validatePayload.js";
import Projects from "../models/Projects.js";

const teamRouter = express.Router();
teamRouter.post("/projects", validatePayload, async (req, res) => {
    try {
        const { projectId } = req.query;
        if (projectId) {
            const updateProject = await Projects.findByIdAndUpdate(
                projectId,
                req.body,
                { new: true },
            );
            if (!updateProject)
                return res.status(400).json({
                    success: false,
                    error: "Cannot update project details, try again later.",
                });

            res.json({
                success: true,
                message: "Successfully updated project's details",
                updateProject,
            });
        } else {
            const newProject = await Projects.create(req.body);
            if (!newProject)
                return res.status(400).json({
                    success: false,
                    error: "Cannot create project, try again later.",
                });

            res.json({
                success: true,
                message: "Successfully created new project",
                newProject,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

teamRouter.get("/projects", async (req, res) => {
    try {
        const projects = await Projects.find({}).lean();
        if (!projects) return res.status(404).json({ error: "No projects found" });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default teamRouter;
