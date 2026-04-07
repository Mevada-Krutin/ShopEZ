import express from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { verifyAdminToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
// import { bulkUploadProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", verifyAdminToken, upload.single("image"), addProduct);
router.put("/:id", verifyAdminToken, updateProduct);
router.delete("/:id", verifyAdminToken, deleteProduct);

// router.post(
//   "/bulk-upload",
//   verifyAdminToken,
//   upload.fields([
//     { name: "products" }, // CSV file
//     { name: "images" }    // ZIP file
//   ]),
//   bulkUploadProducts
// );

export default router;
