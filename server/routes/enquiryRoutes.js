import express from "express";
import {
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiry,
} from "../controllers/enquiryController.js";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

router.post("/", submitEnquiry);
router.get("/", getAllEnquiries);
router.get("/:id", getEnquiryById);
router.delete("/:id", deleteEnquiry);
router.put("/:id/view", async (req, res) => {
  try {
    const updated = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { viewed: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Enquiry not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
