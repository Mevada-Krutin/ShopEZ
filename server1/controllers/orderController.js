import Order from "../models/order.js";
import Product from "../models/product.js";

// export const createOrder = async (req, res) => {
  
//   try {
//     const { items, totalPrice, address } = req.body;
//     const userId = req.user?._id || null; // get logged-in user from JWT

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "Order must have at least one item" });
//     }
//     if (!totalPrice || totalPrice <= 0) {
//       return res.status(400).json({ message: "Total price must be greater than zero" });
//     }
//     if (!address || !address.name || !address.phone || !address.city || !address.state || !address.pincode) {
//       return res.status(400).json({ message: "Complete address is required" });
//     }

//     // Validate products exist
//     for (const item of items) {
//       const productExists = await Product.findById(item.productId);
//       if (!productExists) {
//         return res.status(400).json({ message: `Product not found: ${item.productId}` });
//       }
//       if (!item.quantity || item.quantity <= 0) {
//         return res.status(400).json({ message: `Invalid quantity for product: ${item.productId}` });
//       }
//     }

//     const order = new Order({
//       userId,
//       items,
//       totalPrice,
//       address,
//     });

//     await order.save();
//     res.status(201).json({ message: "Order created successfully", order });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating order", error: error.message });
//   }
// };

// ✅ NEW CREATE ORDER FUNCTION

export const createOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.user?._id || null; // from JWT middleware

    // ✅ Validate basic fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item" });
    }

    if (!address || !address.name || !address.phone || !address.city || !address.state || !address.pincode) {
      return res.status(400).json({ message: "Complete address is required" });
    }

    // ✅ Validate products and calculate total price in parallel
    let totalPrice = 0;

    await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product not found: ${item.productId}`);
        if (!item.quantity || item.quantity <= 0)
          throw new Error(`Invalid quantity for product: ${item.productId}`);

        totalPrice += product.price * item.quantity;
      })
    );

    // ✅ Create order
    const order = new Order({
      userId,
      items,
      totalPrice,
      address,
      status: "Pending",
      createdAt: new Date(),
    });

    await order.save();

    // ✅ Return clean response
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: {
        id: order._id,
        totalPrice: order.totalPrice,
        itemCount: order.items.length,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};


// ✅ Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "username email")            // 👈 show name + email
      .populate("items.productId", "title price")  // 👈 show product title
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// ✅ Get orders by specific user
export const getOrders = async (req, res) => {
  try {
    // Use logged-in user ID from JWT
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("items.productId", "title price")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "Cancelled") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json(order);
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};

// ✅ Mark order as Delivered
export const markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "Delivered") {
      return res.status(400).json({ message: "Order already delivered" });
    }

    order.status = "Delivered";
    await order.save();

    res.json(order);
  } catch (error) {
    console.error("Error marking order as delivered:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};