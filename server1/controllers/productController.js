import Product from "../models/product.js";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import csvParser from "csv-parser";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, price, description, category, subcategory, stock } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !price || !category || !imagePath) {
      return res.status(400).json({ error: "title, price, category, and image are required" });
    }

    const newProduct = new Product({ title, price, description, category, image: imagePath , subcategory
, stock
    });
    await newProduct.save();

    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

// export const bulkUploadProducts = async (req, res) => {
//   try {
//     if (!req.files || !req.files.products || !req.files.images) {
//       return res.status(400).json({ error: "CSV file and Images ZIP are required" });
//     }

//     const csvFilePath = req.files.products[0].path;
//     const zipFilePath = req.files.images[0].path;

//     // Extract images ZIP
//     const zip = new AdmZip(zipFilePath);
//     const imagesDir = path.join("uploads", "images");
//     if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
//     zip.extractAllTo(imagesDir, true);

//     // Parse CSV
//     const products = await new Promise((resolve, reject) => {
//       const results = [];
//       fs.createReadStream(csvFilePath)
//         .pipe(csvParser())
//         .on("data", (row) => {
//           const imageFile = row.image?.trim();
//           const imagePath = imageFile && fs.existsSync(path.join(imagesDir, imageFile))
//             ? `/uploads/images/${imageFile}`
//             : null;

//           // Only add product if all required fields exist
//           if (row.title && row.price && row.category && row.subcategory && row.stock && imagePath) {
//             results.push({
//               title: row.title,
//               price: Number(row.price),
//               discountPrice: row.discountPrice ? Number(row.discountPrice) : 0,
//               category: row.category,
//               subcategory: row.subcategory,
//               stock: Number(row.stock),
//               status: row.status || "draft",
//               description: row.description || "",
//               image: imagePath
//             });
//           }
//         })
//         .on("end", () => resolve(results))
//         .on("error", (err) => reject(err));
//     });

//     if (products.length === 0) {
//       return res.status(400).json({ error: "No valid products found in CSV" });
//     }

//     await Product.insertMany(products);
//     res.status(201).json({ message: "Products uploaded successfully", count: products.length });

//   } catch (err) {
//     res.status(500).json({ error: "Bulk upload failed", details: err.message });
//   }
// };