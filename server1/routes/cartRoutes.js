import express from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";
// import { verifyUserToken } from "../middleware/authMiddleware.js";


const router = express.Router();

// Get user's cart
router.get("/", authMiddleware, getCart);

// Add item to user's cart
router.post("/", authMiddleware, addToCart);

// Remove specific item
router.delete("/:productId", authMiddleware, removeFromCart);

// Clear entire cart (on logout)
router.delete("/", authMiddleware, clearCart);



export default router;
