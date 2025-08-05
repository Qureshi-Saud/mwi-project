import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  companyName: String,
  subject: String,
  message: String,
  viewed: {
    type: Boolean,
    default: false,
  },
  starred: {
    type: Boolean,
    default: false,
    index: true,
  },
}, { timestamps: true });

export default mongoose.model("Enquiry", enquirySchema);
