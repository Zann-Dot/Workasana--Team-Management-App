
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
      }
      next();
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
}

export default validatePayload;
