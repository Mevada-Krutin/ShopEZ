import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import Order from "../models/order.js";
import { verifyAdminToken } from "../middleware/authMiddleware.js";
import { getAllOrders } from "../controllers/orderController.js";


const router = express.Router();

router.post("/", createOrder);

/**
 * Get all orders (ADMIN)
 */
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId", "title price")
      .populate("userId", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get orders for a specific user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("items.productId", "title price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Update order status
 */
router.put("/:id/status", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Delete an order
 */
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", verifyAdminToken, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "items.productId",
        select: "title longTitle price", // ✅ only required fields
      })
      .populate("userId", "name email");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
