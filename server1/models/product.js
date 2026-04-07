import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    description: { type: String, default: "" },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
