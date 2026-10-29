import express from "express";
import Tags from "../models/Tags.js";
const tagsRouter = express.Router();
tagsRouter.post("/tags", async (req, res) => {
    try {
        const tags = await Tags.create(req.body);
        if (!tags) return res.status(400).json({ error: "cannot create tag" });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
tagsRouter.get("/tags", async (req, res) => {
    try {
        const tags = await Tags.find({}).lean();
        if (!tags) return res.status(404).json({ error: "No tags found" });
        res.json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default tagsRouter;
