import express from "express";
import validateSignupDetails from "../middleware/validateSignupPayload.js";
import getHashedPassword from "../middleware/hashPassword.js";
import Users from "../models/Users.js";
const userRouter = express.Router();

userRouter.post("/auth/signup", validateSignupDetails, async (req, res) => {
   try {
      const hash = await getHashedPassword(req.body.password);
      const user = await Users.create({ ...req.body, password: hash });
      res.json({
         success: true,
         message: "user registered successfully",
         user
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

export default userRouter;
