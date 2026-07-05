import { Router } from "express";
import { protect, restrictTo } from "../middleware/auth.js";
import { getAdminStats, listUsers, getUser, updateUserStatus, deleteUser, getChatLogs } from "../controllers/adminController.js";

const router = Router();
router.use(protect, restrictTo("admin"));

router.get("/stats",               getAdminStats);
router.get("/users",               listUsers);
router.get("/users/:id",           getUser);
router.patch("/users/:id/status",  updateUserStatus);
router.delete("/users/:id",        deleteUser);
router.get("/chats",               getChatLogs);

export default router;
