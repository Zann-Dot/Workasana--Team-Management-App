import express from "express";
import validatePayload from "../middleware/validatePayload.js";
import Projects from "../models/Projects.js";

const projectRouter = express.Router();
projectRouter.post("/projects", validatePayload, async (req, res) => {
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

projectRouter.get("/projects", async (req, res) => {
    try {
        const query = {};
        const { status, priority, dueDate, search, view } = req.query
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit)
        const sort = { createdAt: -1 };

        if (search) {
            const searchTerm = search.trim()
            const searchRegex = { $regex: searchTerm, $option: "i" }
            query.name = searchRegex
        }

        if (view) query.status = { $ne: "completed" }
        if (status) query.status = status.trim().toLowerCase();
        if (priority) query.priority = priority.trim().toLowerCase();
        if (dueDate && (query.status !== "completed" || !query.status)) {
            if (!query.status) query.status = { $ne: "completed" }
            sort = { dueDate }
        }

        const [projects, totalProjects] = await Promise.all([
            Projects.find(query)
                .populate("teamId")
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            Projects.countDocuments(query)
        ])

        if (!projects) return res.status(404).json({ error: "No projects found" });
        res.json({
            totalProjects,
            projects,
            totalPages: Math.ceil(totalProjects / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default projectRouter;
