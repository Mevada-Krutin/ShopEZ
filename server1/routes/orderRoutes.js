import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import Order from "../models/order.js";
import  { verifyAdminToken ,authMiddleware} from "../middleware/authMiddleware.js";
import { getAllOrders, cancelOrder, markAsDelivered, } from "../controllers/orderController.js";


const router = express.Router();

// User Create orders
router.post("/", createOrder);
// User Get their orders
// router.get("/my-orders", getOrders);
router.get("/my-orders", authMiddleware,getOrders);
router.put("/cancel/:id", cancelOrder);


// Only Admin routes
router.get("/", verifyAdminToken, getAllOrders);
router.put("/:id/cancel", verifyAdminToken, cancelOrder);
router.put("/:id/deliver", verifyAdminToken, markAsDelivered);

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
