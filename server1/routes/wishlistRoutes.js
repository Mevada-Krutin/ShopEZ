import express from "express";
import Wishlist from "../models/Wishlist.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ Get Wishlist Items
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ userId });
    res.json(wishlist ? wishlist.items : []);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
});

// ✅ Add Item to Wishlist
router.post("/add", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, title, image, price } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    const already = wishlist.items.find(
      (item) => item.productId.toString() === productId
    );

    if (already) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    wishlist.items.push({ productId, title, image, price });
    await wishlist.save();

    res.json({ message: "Added to wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
});

// ✅ Remove Item
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    res.json({ message: "Removed from wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
});

export default router;
