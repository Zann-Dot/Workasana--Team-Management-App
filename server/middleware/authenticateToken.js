import jwt from "jsonwebtoken";
async function authenticateToken(req, res, next) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.cookies.sessionToken;
    if (!token)
        return res
            .status(401)
            .json({ error: "Access Denied. Please log in." });
    try {
        const verifiedToken = jwt.verify(token, JWT_SECRET);
        req.user = verifiedToken.payload;
        next();
    } catch (error) {
        res.status(403).json({ error: "Unauthorized: Token missing or expired!" });
    }
}

export default authenticateToken;
