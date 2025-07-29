import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers
} from "../controllers/userController.js";  // ✅ IMPORT properly

import { verifyAdminToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin only route
router.get("/", verifyAdminToken, getAllUsers);

export default router;
