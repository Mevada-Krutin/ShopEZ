import express from "express";
import { registerUser, loginUser, resetPasswordWithOtp, getAllUsers, updateUser, deleteUser, sendResetOtp } from "../controllers/userController.js";

import { verifyAdminToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password-otp", sendResetOtp);
// router.post("/reset-password", resetPassword);
router.post("/reset-password-otp", resetPasswordWithOtp);

// Admin only route
router.get("/", verifyAdminToken, getAllUsers);
router.put("/:id", verifyAdminToken, updateUser);
router.delete("/:id", verifyAdminToken, deleteUser);


export default router;
