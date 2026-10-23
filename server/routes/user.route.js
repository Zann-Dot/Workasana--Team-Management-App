import express from "express";
import validateSignupDetails from "../middleware/validateSignupPayload.js";
const userRouter = express.Router();

userRouter.post("/auth/signup", validateSignupDetails, async (req, res) => {
   try {
      const { email, name, password } = req.body;

      res.json({ message: "ok" });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

export default userRouter;
