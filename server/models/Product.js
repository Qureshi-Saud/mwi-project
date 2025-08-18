import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  application: { type: String, required: true },
  image: { type: String, required: true },
  image2: { type: String },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }, // Added status
  materials: {
    sealRingFaces: String,
    seatFaces: String,
    elastomer: String,
    moc: String,
    bellowMoc: String,
    endFittingMoc: String,
  },
  operatingLimits: {
    shaftDia: String,
    pressure: String,
    temperature: String,
    speed: String,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;