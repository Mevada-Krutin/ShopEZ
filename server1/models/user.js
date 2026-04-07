import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  token:{type:String},
  otp: String,          // store OTP temporarily
  otpExpiry: Date,      // OTP expiration time
  
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  status: { type: String, enum: ["active", "blocked"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: null },

});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  // consoel.log("Password hashed before saving user.");
  next();
});

export default mongoose.model("User", userSchema);