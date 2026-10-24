import Users from "../models/Users.js";

async function validatePayload(req, res, next) {
   try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_]).{8,}$/;

      for (let key in req.body) {
         const value = req.body[key];
         if (!value || value.length === 0)
            return res
               .status(400)
               .json({ error: `${key} ${Array.isArray(value) ? "are" : "is"} required.` });

         if (key === "email" && !emailRegex.test(value))
            return res
               .status(400)
               .json({ error: "Invalid or missing email format" });

         if (key === "email" && req.body?.name) {
            const user = await Users.findOne({ email: value });
            if (user)
               return res.status(400).json({ error: "Email already in use." });
         }

         if (key === "password" && !passwordRegex.test(value))
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

export default validatePayload;
