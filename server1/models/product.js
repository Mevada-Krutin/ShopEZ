import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
