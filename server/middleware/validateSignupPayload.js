import Users from "../models/Users.js";

async function validateAuthPayload(req, res, next) {
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

         if (property === "email" && req.body?.name) {
            const user = await Users.findOne({ email: req.body[property] });
            if (user)
               return res.status(400).json({ error: "Email already in use." });
         }

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

export default validateAuthPayload;
