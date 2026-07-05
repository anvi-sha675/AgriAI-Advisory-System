import { Router as AuthRouter } from "express";
export const authRouter = AuthRouter();
import { register, login, getMe, updateProfile, changePassword } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getMe);
authRouter.patch("/me", protect, updateProfile);
authRouter.patch("/change-password", protect, changePassword);
