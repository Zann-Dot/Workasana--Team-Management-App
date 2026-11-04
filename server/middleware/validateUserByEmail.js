import Users from "../models/Users.js";

async function validateUserByEmail(req, res, next) {
    try {
        const user = await Users.findOne({ email: req.body.email }).maxTimeMS(5000);
        if (!user)
            return res.status(404).json({ error: "Cannot find account associated with this email." });
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default validateUserByEmail