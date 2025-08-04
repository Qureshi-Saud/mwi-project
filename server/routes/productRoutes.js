import express from "express";
import {
  uploadProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  upload,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", upload, uploadProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", protect, deleteProduct);

export default router;
