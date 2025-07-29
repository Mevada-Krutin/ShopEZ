import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId}).populate("items.productId", "title price image");
    // res.json(cart ? cart.items : []);
     res.status(200).json(cart || { userId, items: [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const addToCart = async (req, res) => {
  
  try {
    const { productId, quantity } = req.body;
    
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }
    const itemIndex = cart.items.findIndex((i) => i.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== req.params.productId
      );
      await cart.save();
    }
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from cart" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    await Cart.findOneAndUpdate({ userId}, { items: [] });
     res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
