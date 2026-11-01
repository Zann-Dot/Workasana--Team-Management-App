import express from "express";
import validatePayload from "../middleware/validatePayload.js";
import getHashedPassword from "../middleware/hashPassword.js";
import Users from "../models/Users.js";
import validateLoginCredential from "../middleware/loginValidation.js";
import jwt from "jsonwebtoken";
import authenticateToken from "../middleware/authenticateToken.js";
const userRouter = express.Router();

userRouter.post("/auth/signup", validatePayload, async (req, res) => {
   try {
      const { email } = req.body;
      const isUserExist = await Users.findOne({ email });
      if (isUserExist)
         return res.status(400).json({ error: "Email already in-use" });
      const hash = await getHashedPassword(req.body.password);
      const user = await Users.create({ ...req.body, password: hash });
      res.json({
         success: true,
         message: "User registered successfully",
         user,
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

userRouter.post("/auth/login", validatePayload, async (req, res) => {
   console.log("[LOGIN] Route hit at:", Date.now());
   try {
      const JWT_SECRET = process.env.JWT_SECRET;
      const { email, password } = req.body;

      console.log("[LOGIN] Route hit at:", Date.now());
      const user = await Users.findOne({ email }).maxTimeMS(5000);
      console.log("[LOGIN] Route hit at:", Date.now());

      if (!user)
         return res.status(404).json({ error: "Cannot find account associated with this email." });

      console.log("[LOGIN] Route hit at:", Date.now());
      const getAuth = await validateLoginCredential(password, user.password);
      console.log("[LOGIN] Route hit at:", Date.now());

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
      console.log("[LOGIN] Route hit at:", Date.now());
      res.status(500).json({ error: error.message });
   }
});

userRouter.get("/auth/user", authenticateToken, async (req, res) => {
   try {
      const user = await Users.findById(req.user.userId)
      res.json(user)
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
})

export default userRouter;
