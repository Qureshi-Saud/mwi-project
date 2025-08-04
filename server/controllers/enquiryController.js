import Enquiry from "../models/Enquiry.js";

export const submitEnquiry = async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.status(201).json({ success: true, message: "Enquiry submitted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Submission failed", error });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch enquiries", error });
  }
};

export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Not found" });
    res.status(200).json(enquiry);
  } catch (err) {
    res.status(500).json({ message: "Error fetching enquiry", err });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Enquiry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", err });
  }
};
