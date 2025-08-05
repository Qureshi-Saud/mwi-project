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

// Mark as viewed
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

// ⭐️ Mark/Unmark as Starred
router.put("/:id/star", async (req, res) => {
  const { id } = req.params;
  const { starred } = req.body;

  try {
    const updated = await Enquiry.findByIdAndUpdate(id, { starred }, { new: true });
    if (!updated) return res.status(404).json({ message: "Enquiry not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle star status" });
  }
});

export default router;
