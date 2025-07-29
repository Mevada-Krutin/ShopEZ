import AdminUser from "../models/admin.js";
import jwt from "jsonwebtoken";

// Create Default Admin
export const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await AdminUser.findOne({ username: "admin" });
    if (!existingAdmin) {
      const newAdmin = new AdminUser({
        username: "admin",
        password: "admin123" // In production: hash this!
      });
      await newAdmin.save();
      console.log("✅ Default admin created: admin/admin123");
    } else {
      console.log("ℹ️ Default admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
};

// Login Admin
export const loginAdminUser = async (req, res) => {
  const { username, password } = req.body;
  const admin = await AdminUser.findOne({ username });

  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "1d" }
  );

  res.status(200).json({ message: "Login successful", token });
};
