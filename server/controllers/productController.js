import Product from "../models/Product.js";
import multer from "multer";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "image2", maxCount: 1 },
]);

export const uploadProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      application,
      sealRingFaces,
      seatFaces,
      elastomer,
      moc,
      bellowMoc,
      endFittingMoc,
      shaftDia,
      pressure,
      temperature,
      speed,
    } = req.body;

    const uploadToCloudinary = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "microwell_products" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });

    const image1Url = await uploadToCloudinary(req.files.image[0].buffer);
    const image2Url = req.files.image2
      ? await uploadToCloudinary(req.files.image2[0].buffer)
      : null;

    const product = new Product({
      name,
      type,
      application,
      image: image1Url.secure_url,
      image2: image2Url?.secure_url || "",
      status: "Active", // Default status
      materials: {
        sealRingFaces,
        seatFaces,
        elastomer,
        moc,
        bellowMoc,
        endFittingMoc,
      },
      operatingLimits: {
        shaftDia,
        pressure,
        temperature,
        speed,
      },
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Upload error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Invalid product ID" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// New: Update product status
export const updateProductStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Active", "Inactive"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Status updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};

