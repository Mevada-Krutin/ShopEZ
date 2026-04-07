import express from "express";
import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { verifyAdminToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/dashboard-stats
router.get("/", verifyAdminToken, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    res.json({ totalProducts, totalUsers, pendingOrders });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});
router.get("/dashboard-stats", verifyAdminToken, getDashboardStats);

export default router;
