import express from "express";
import {
  register,
  login,
  isAuth,
  logout,
  sendVerifyOtp,
  verifyEmail,
  sendResetOtp,
  resetPassword,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

// Authentication routes
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/is-auth", userAuth, isAuth);
authRouter.get("/logout", logout);

// Email verification routes
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);

// Password reset routes (no auth required)
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
