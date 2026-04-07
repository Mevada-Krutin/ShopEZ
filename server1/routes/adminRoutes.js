import express from "express";
import { loginAdminUser, createAdmin, adminForgotPassword, adminResetPassword  } from "../controllers/adminController.js";

const router = express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdminUser);
// Forgot password OTP routes
router.post("/forgot-password", adminForgotPassword );
// router.post("/reset-password-otp", verifyAdminOtpAndReset);
router.post("/reset-password", adminResetPassword);

export default router;
