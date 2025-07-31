import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function UploadProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    type: "",
    materials: "",
    operatingLimits: "",
    application: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image.");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));

      await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product uploaded successfully!");
      setForm({ name: "", type: "", materials: "", operatingLimits: "", application: "" });
      setImage(null);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Upload Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="border px-3 py-2 w-full" required />
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type" className="border px-3 py-2 w-full" required />
        <textarea name="materials" value={form.materials} onChange={handleChange} placeholder="Materials" className="border px-3 py-2 w-full" required />
        <textarea name="operatingLimits" value={form.operatingLimits} onChange={handleChange} placeholder="Operating Limits" className="border px-3 py-2 w-full" required />
        <textarea name="application" value={form.application} onChange={handleChange} placeholder="Application" className="border px-3 py-2 w-full" required />
        <input type="file" onChange={handleFileChange} accept="image/*" className="w-full" required />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default UploadProduct;
