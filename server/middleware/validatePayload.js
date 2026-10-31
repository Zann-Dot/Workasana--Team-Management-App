import Users from "../models/Users.js";

async function validatePayload(req, res, next) {
   try {
      for (let key in req.body) {
         const value = req.body[key];
         if (!value || value.length === 0)
            return res
               .status(400)
               .json({
                  error: `${key} ${Array.isArray(value) ? "are" : "is"} required.`,
               });

         if (key === "email" && req.body?.name) {
            const user = await Users.findOne({ email: value });
            if (user)
               return res.status(400).json({ error: "Email already in use." });
         }
      }
      next();
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
}

export default validatePayload;
