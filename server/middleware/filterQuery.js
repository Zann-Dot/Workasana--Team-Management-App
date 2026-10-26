function filterQuery(req, res, next) {
    try {
        const { team, owner, tags, project, status } = req.query;
        let query = {};
        if (team) query.team = team.trim();
        if (owner) query.owners = { $in: owner.trim() };
        if (project) query.project = owner.trim();
        if (status) query.status = status.trim().toLowerCase();
        if (tags) query.tags = { $in: Array.isArray(tags) ? tags : [tags] };
        req.filterQueries = query;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid filter query." });
    }
}
export default filterQuery;
