import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  materials: { type: String, required: true },
  operatingLimits: { type: String, required: true },
  application: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
