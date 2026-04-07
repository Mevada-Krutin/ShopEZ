import AdminUser from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// ====================== Create Default Admin ======================
export const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await AdminUser.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10); // ✅ Hash password
      const newAdmin = new AdminUser({
        username: "admin",
        password: hashedPassword,
        isAdmin: true
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

// ====================== Create New Admin (Manual Registration) ======================
export const createAdmin = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // 1. Confirm password check
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "❌ Passwords do not match" });
    }

    // 2. Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "⚠️ Admin already exists" });
    }

    // 3. 
    const existingEmail = await AdminUser.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "⚠️ Email already registered" });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Save new admin
    const newAdmin = new AdminUser({
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await newAdmin.save();

    // 6. Generate JWT for auto login
    const token = jwt.sign(
      { id: newAdmin._id, isAdmin: newAdmin.isAdmin, email: newAdmin.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );
    

    res.status(201).json({
      message: "✅ Admin account created successfully!",
      token,
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
      },
    });
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ====================== Login Admin ======================
export const loginAdminUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const admin = await AdminUser.findOne({ username, email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, email: admin.email, isAdmin: true },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token, // ✅ return token
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== Forgot Password (Simplified) ===================
// export const sendAdminOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Find admin by email
//     const admin = await AdminUser.findOne({ email });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     admin.otp = otp;
//     admin.otp_expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
//     await admin.save();

//     // Send email
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.MAIL_USER,
//       to: email,
//       subject: "Admin Password Reset OTP",
//       text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
//     });

//     res.json({ message: "OTP sent successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error sending OTP" });
//   }
// };

// ✅ New CODE for SIMPLE FORGOT-PASS 
export const adminForgotPassword = async (req, res) => {
  const { username, resetKey, newPassword } = req.body;

  try {
    // 1. Validate reset key
    if (resetKey !== process.env.ADMIN_RESET_KEY) {
      return res.status(400).json({ message: "Invalid reset key" });
    }

    // 2. Check admin exists
    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 3. Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    // 4. Update password
    admin.password = hashed;
    await admin.save();

    return res.json({ message: "Password reset successful!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const verifyAdminOtpAndReset = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const admin = await AdminUser.findOne({ email });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     if (admin.otp !== otp)
//       return res.status(400).json({ message: "Invalid OTP" });

//     if (Date.now() > admin.otp_expiry)
//       return res.status(400).json({ message: "OTP expired" });

//     const hashed = await bcrypt.hash(newPassword, 10);

//     admin.password = hashed;
//     admin.otp = null;
//     admin.otp_expiry = null;
//     await admin.save();

//     res.json({ message: "Password reset successful!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error resetting password" });
//   }
// };

export const adminResetPassword = async (req, res) => {
  try {
    const { username, resetKey, newPassword } = req.body;

    if (!username || !resetKey || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Compare resetKey with env key
    if (resetKey !== process.env.ADMIN_RESET_KEY) {
      return res.status(401).json({ message: "Invalid reset key" });
    }

    // Find admin
    const admin = await AdminUser.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.json({ message: "✅ Password reset successful. You can now login." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};