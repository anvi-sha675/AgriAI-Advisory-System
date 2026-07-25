import { Router as AuthRouter } from "express";
export const authRouter = AuthRouter();
import passport, { isGoogleConfigured } from "../config/passport.js";
import {
  register,
  login,
  logout,
  googleCallback,
  getMe,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import {
  validateBody,
  registerSchema,
  loginSchema,
} from "../validators/authValidators.js";
import { sendError } from "../utils/response.js";

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", protect, logout);
authRouter.get("/me", protect, getMe);
authRouter.patch("/me", protect, updateProfile);
authRouter.patch("/change-password", protect, changePassword);

authRouter.get("/google", (req, res, next) => {
  if (!isGoogleConfigured) {
    return sendError(
      res,
      "Google sign-in is not configured on this server.",
      503,
    );
  }
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })(req, res, next);
});

authRouter.get(
  "/google/callback",
  (req, res, next) => {
    if (!isGoogleConfigured) {
      return sendError(
        res,
        "Google sign-in is not configured on this server.",
        503,
      );
    }
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/login",
    })(req, res, next);
  },
  googleCallback,
);
