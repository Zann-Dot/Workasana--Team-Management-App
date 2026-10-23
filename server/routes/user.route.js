import express from "express";
import validateAuthPayload from "../middleware/validateSignupPayload.js";
import getHashedPassword from "../middleware/hashPassword.js";
import Users from "../models/Users.js";
import validateLoginCredential from "../middleware/loginValidation.js";
import jwt from "jsonwebtoken";
const userRouter = express.Router();

userRouter.post("/auth/signup", validateAuthPayload, async (req, res) => {
   try {
      const hash = await getHashedPassword(req.body.password);
      const user = await Users.create({ ...req.body, password: hash });
      res.json({
         success: true,
         message: "user registered successfully",
         user,
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

userRouter.post("/auth/login", validateAuthPayload, async (req, res) => {
   try {
      const JWT_SECRET = process.env.JWT_SECRET;
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      const getAuth = await validateLoginCredential(password, user.password);
      if (!getAuth.auth)
         return res.status(401).json({ error: getAuth.message });

      const token = jwt.sign(
         { userId: user._id, email: user.email },
         JWT_SECRET,
         { expiresIn: "168h" },
      );

      res.cookie("sessionToken", token, {
         maxAge: 168 * 3600000,
         secure: true,
         httpOnly: true,
         sameSite: "strict",
      });

      res.json({
         success: true,
         message: "Logged in successfully!",
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

export default userRouter;
