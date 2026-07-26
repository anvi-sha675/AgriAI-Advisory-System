import { Router } from "express";
import { protect, restrictTo } from "../middleware/auth.js";
import {
  getAdminStats,
  listUsers,
  getUser,
  createUser,
  updateUser,
  updateUserStatus,
  deleteUser,
  getChatLogs,
  getChatById,
} from "../controllers/adminController.js";
import {
  validateBody,
  adminCreateUserSchema,
  adminUpdateUserSchema,
} from "../validators/authValidators.js";

const router = Router();
router.use(protect, restrictTo("admin"));

router.get("/stats", getAdminStats);
router.get("/users", listUsers);
router.post("/users", validateBody(adminCreateUserSchema), createUser);
router.get("/users/:id", getUser);
router.patch("/users/:id", validateBody(adminUpdateUserSchema), updateUser);
router.patch("/users/:id/status", updateUserStatus);
router.delete("/users/:id", deleteUser);
router.get("/chats", getChatLogs);
router.get("/chats/:id", getChatById);

export default router;
