import Projects from "../models/Projects.js";
import Teams from "../models/Teams.js";
import Users from "../models/Users.js";
async function validateReferences(req, res, next) {
    try {
        const { project: projectId, team: teamId, owners } = req.body;

        for (const userId of owners) {
            const user = await Users.findById(userId);
            if (!user)
                return res.status(404).json({ error: `Invalid User Id: ${userId}` });
        }

        const [project, team] = await Promise.all([
            Projects.findById(projectId),
            Teams.findById(teamId),
        ]);

        if (!project)
            return res.status(404).json({ error: `Project:${projectId} not found` });

        if (!team)
            return res.status(404).json({ error: `Team:${teamId} not found` });
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default validateReferences;
