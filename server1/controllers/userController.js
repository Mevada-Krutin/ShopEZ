import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { sendEmail } from "../utils/email.js"; 


// SIGNUP
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// ✅ NEW CODE FOR LOGIN USER
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ success: false, message: "Invalid email or password" });
//     }

//     // Blocked user check
//     if (user.status === "blocked") {
//       return res.status(403).json({ success: false, message: "Your account has been blocked" });
//     }

//     // Password validation
//     let isPasswordValid = false;
//     console.log("EMAIL:", email);
//     console.log("PASSWORD:", password);
//     console.log("USER:", user);

// // Support all bcrypt formats ($2a$, $2b$, $2y$)
// if (user.password.startsWith("$2")) {
//   isPasswordValid = await bcrypt.compare(password, user.password);
// } else {
//   // Plaintext fallback (legacy)
//   isPasswordValid = password === user.password;
//   if (isPasswordValid) {
//     user.password = await bcrypt.hash(password, 10);
//     await user.save();
//   }
// }

//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: "Invalid email or password" });
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "1d" }
//     );
    
//     // Update last login
//     user.lastLogin = new Date();
//     user.token=token;
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       data: {
//         token,
//         name: user.name,
//         role: user.role,
//         status: user.status,
//       },
//     });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ success: false, message: "Error logging in", error: error.message });
//   }
// };

// // Temporary in-memory OTP store
// let otpStore = {}; 


// // Configure Nodemailer
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// ✅ AGAIN NEW CODE LOGIN USER
// ✅ LOGIN CONTROLLER
// console.log("Incoming req.body:", req.body);

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2️⃣ Compare password with hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Check user status
    if (user.status === "blocked") {
      return res.status(403).json({ message: "Your account is blocked" });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "24h" }
    );

    // 5️⃣ Update last login
    user.lastLogin = new Date();
    // user.token = token;
    await user.save();

    // 6️⃣ Send success response
    return res.status(200).json({
      message: "Login successful",
      data: {
        token,
        name: user.name,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};



// ----------------------------
// SEND RESET OTP
// ----------------------------
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();


    await sendEmail(email, "Your SHOPEZ OTP", `Your OTP is: ${otp}. It expires in 10 minutes.`);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// export const resetPassword = async (req, res) => {
//   try {
//     let { name, email, newPassword, confirmPassword } = req.body;

//     // Trim inputs
//     name = name?.trim();
//     email = email?.trim().toLowerCase();
//     newPassword = newPassword?.trim();
//     confirmPassword = confirmPassword?.trim();

//     if (!name || !email || !newPassword || !confirmPassword) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // Find user by name and email (case-insensitive)
//     const user = await User.findOne({
//       name: { $regex: new RegExp("^" + name + "$", "i") },
//       email: { $regex: new RegExp("^" + email + "$", "i") },
//     });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Hash new password and save
//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.status(200).json({ message: "✅ Password reset successful. Please login with your new password." });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// ----------------------------
// VERIFY OTP & RESET PASSWORD
// ----------------------------
export const resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    // 1️⃣ Validate inputs
    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 3️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4️⃣ Check OTP and expiry
    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry && user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // 5️⃣ Hash new password
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;

    // 6️⃣ Remove OTP fields
    user.otp = undefined;
    user.otpExpiry = undefined;

    // 7️⃣ Save the updated user
    await user.save();

    // 8️⃣ Return success
    res.status(200).json({ message: "Password reset successful. Please log in again." });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};



// ✅ NEW CODE GET ALL USERS (Admin only)
// GET /api/users?page=1&limit=10
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // total users count
    const totalUsers = await User.countDocuments();

    // fetch users, newest first, exclude password
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-password");

    res.status(200).json({
      success: true,
      data: users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      message: "Users fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ NEW CODE FOR UPDATE USER ADMIN ONLY
// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Check if email is being changed and is unique
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
      user.email = email;
    }

    // Update name, role, status
    if (name) user.name = name;
    if (role) user.role = role;
    if (status) user.status = status;

    const updatedUser = await user.save();

    // Exclude password before sending
    const userObj = updatedUser.toObject();
    delete userObj.password;

    res.status(200).json({
      success: true,
      data: userObj,
      message: "User updated successfully",
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};



// ✅ Delete User (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
