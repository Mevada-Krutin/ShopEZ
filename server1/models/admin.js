import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  isAdmin: { type: Boolean, default: true },
  otp: { type: String },
  otp_expiry: { type: Date },
  email: { type: String, required: true, unique: true },
  
});

export default mongoose.model("AdminUser", adminSchema);
