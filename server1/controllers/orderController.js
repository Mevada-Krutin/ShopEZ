import Order from "../models/order.js";

// ✅ Create new order
export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, address, userId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item" });
    }

    const order = new Order({
      userId: userId || null,
      items,
      totalPrice,
      address,
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

// ✅ Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "title price"); // Match Product model fields
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders", error: error.message });
  }
};

// ✅ Get orders for specific user
export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .populate("items.productId", "title price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default getAllOrders