function validateSignupDetails(req, res, next) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_]).{8,}$/;

        for (let property in req.body) {
            if (!req.body[property])
                return res
                    .status(400)
                    .json({ error: `${property} is required for authentication` });

            if (property === "email" && !emailRegex.test(req.body[property]))
                return res
                    .status(400)
                    .json({ error: "Invalid or missing email format" });

            if (property === "password" && !passwordRegex.test(req.body[property]))
                return res.status(400).json({
                    error:
                        "Password must be at least 8 characters and contain a number, special character, uppercase, and lowercase letter",
                });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default validateSignupDetails