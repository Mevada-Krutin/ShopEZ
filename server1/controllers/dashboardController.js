import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";


// export const getDashboardStats = async (req, res) => {
//   try {
//     const totalProducts = await Product.countDocuments();
//     const totalUsers = await User.countDocuments();
//     const totalOrders = await Order.countDocuments();
//     const pendingOrders = await Order.countDocuments({ status: "Pending" });

//     const orders = await Order.find();
//     const revenue = orders.reduce(
//       (sum, o) => sum + (o.totalAmount ? Number(o.totalAmount) : 0),
//       0
//     );

//     res.status(200).json({
//       totalProducts,
//       totalUsers,
//       totalOrders,
//       pendingOrders,
//       revenue,
//       recentOrders: orders.slice(-5).reverse(),
//     });
//   } catch (error) {
//     console.error("Dashboard stats error:", error);
//     res.status(500).json({ message: "Failed to fetch dashboard stats" });
//   }
// };


//✅ Improved version with recent orders including customer name and amount

// export const getDashboardStats = async (req, res) => {
//   try {
//     // Count total products and users
//     const totalProducts = await Product.countDocuments();
//     const totalUsers = await User.countDocuments();

//     // Count total orders and pending orders
//     const totalOrders = await Order.countDocuments();
//     const pendingOrders = await Order.countDocuments({ status: "Pending" });

//     // Calculate total revenue from totalPrice
//     const revenueResult = await Order.aggregate([
//       { $group: { _id: null, total: { $sum: "$totalPrice" } } },
//     ]);
//     const revenue = revenueResult[0]?.total || 0;

//     // Get recent 5 orders
//     const recentOrdersRaw = await Order.find()
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .populate("userId", "username email");

//     const recentOrders = recentOrdersRaw.map((o) => ({
//       _id: o._id,
//       customerName: o.userId?.username || o.address?.name || "Guest",
//       totalAmount: o.totalPrice || 0,
//       status: o.status || "Pending",
//     }));

//     // ✅ Get recent 5 logged-in users
//     const recentLoginsRaw = await User.find({ lastLogin: { $ne: null } })
//       .sort({ lastLogin: -1 })
//       .limit(5);

//     const recentLogins = recentLoginsRaw.map((u) => ({
//       id: u._id,
//       username: u.username,
//       email: u.email,
//       lastLogin: u.lastLogin,
//     }));

//     res.status(200).json({
//       totalProducts,
//       totalUsers,
//       totalOrders,
//       pendingOrders,
//       revenue,
//       recentOrders,
//       recentLogins,
//     });
//   } catch (error) {
//     console.error("Dashboard stats error:", error);
//     res.status(500).json({ message: "Failed to fetch dashboard stats" });
//   }
// };

// ✅ NEW CODE

// Get all dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    // 1️⃣ Count total products and users
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // 2️⃣ Count total orders and pending orders
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    // 3️⃣ Calculate revenue from totalPrice
    const revenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const revenue = revenueResult[0]?.total || 0;

    // 4️⃣ Get recent 5 orders
    const recentOrdersRaw = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "username email");
      // .populate("products.productId", "name");

    const recentOrders = recentOrdersRaw.map((o) => ({
      _id: o._id,
      customerName: o.userId?.username || o.address?.name || "Guest",
      totalAmount: o.totalPrice || 0,
      status: o.status || "Pending",
      // createdAt: o.createdAt,
    }));

    // 5️⃣ Get recent 5 logged-in users
    const recentLoginsRaw = await User.find({ lastLogin: { $ne: null } })
      .sort({ lastLogin: -1 })
      .limit(5);

    const recentLogins = recentLoginsRaw.map((u) => ({
      id: u._id,
      username: u.username || u.name,
      email: u.email,
      lastLogin: u.lastLogin,
    }));

    res.status(200).json({
      totalProducts,
      totalUsers,
      totalOrders,
      pendingOrders,
      revenue,
      recentOrders,
      recentLogins,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};  