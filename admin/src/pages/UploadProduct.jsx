import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const steps = ["Product Details", "Materials", "Operating Limits", "Upload Images"];

function UploadProduct() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", type: "", application: "",
    sealRingFaces: "", seatFaces: "", elastomer: "", moc: "",
    bellowMoc: "", endFittingMoc: "",
    shaftDia: "", pressure: "", temperature: "", speed: "",
  });

  const [images, setImages] = useState({ image: null, image2: null });
  const [previews, setPreviews] = useState({ image: null, image2: null });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setImages((prev) => ({ ...prev, [name]: file }));
    setPreviews((prev) => ({ ...prev, [name]: file ? URL.createObjectURL(file) : null }));
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const validateStep = () => {
    const errors = {};

    if (step === 0) {
      if (!form.name.trim()) errors.name = "Product name is required.";
      if (!form.type.trim()) errors.type = "Type is required.";
      if (!form.application.trim()) errors.application = "Application is required.";
    }

    if (step === 3 && !images.image) {
      errors.image = "Primary image is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(images).forEach(([key, file]) => file && formData.append(key, file));
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));

      await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product uploaded successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Upload Product</h1>

      {/* Step Indicator */}
      <div className="flex justify-between mb-6">
        {steps.map((s, index) => (
          <div key={index} className={`text-sm font-medium text-center flex-1 ${index === step ? "text-blue-600" : "text-gray-400"}`}>
            {index + 1}. {s}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6 border">
        {/* Step 0: Product Details */}
        {step === 0 && (
          <>
            <SectionTitle title="Product Details" />
            <InputField
              label="Product Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              error={formErrors.name}
            />
            <InputField
              label="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              error={formErrors.type}
            />
            <TextAreaField
              label="Application"
              name="application"
              value={form.application}
              onChange={handleChange}
              required
              error={formErrors.application}
            />
          </>
        )}

        {/* Step 1: Materials */}
        {step === 1 && (
          <>
            <SectionTitle title="Materials" />
            <InputField label="Seal Ring Faces" name="sealRingFaces" value={form.sealRingFaces} onChange={handleChange} />
            <InputField label="Seat Faces" name="seatFaces" value={form.seatFaces} onChange={handleChange} />
            <InputField label="Elastomer" name="elastomer" value={form.elastomer} onChange={handleChange} />
            <InputField label="MOC" name="moc" value={form.moc} onChange={handleChange} />
            <InputField label="Bellow MOC" name="bellowMoc" value={form.bellowMoc} onChange={handleChange} />
            <InputField label="End Fitting MOC" name="endFittingMoc" value={form.endFittingMoc} onChange={handleChange} />
          </>
        )}

        {/* Step 2: Operating Limits */}
        {step === 2 && (
          <>
            <SectionTitle title="Operating Limits" />
            <InputField label="Shaft Dia." name="shaftDia" value={form.shaftDia} onChange={handleChange} />
            <InputField label="Pressure" name="pressure" value={form.pressure} onChange={handleChange} />
            <InputField label="Temperature" name="temperature" value={form.temperature} onChange={handleChange} />
            <InputField label="Speed" name="speed" value={form.speed} onChange={handleChange} />
          </>
        )}

        {/* Step 3: Image Uploads */}
        {step === 3 && (
          <>
            <SectionTitle title="Upload Images" />
            <FileInput label="Primary Image *" name="image" onChange={handleFileChange} preview={previews.image} required error={formErrors.image} />
            <FileInput label="Secondary Image" name="image2" onChange={handleFileChange} preview={previews.image2} />
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          {step > 0 && (
            <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Back
            </button>
          )}
          {step < steps.length - 1 && (
            <button type="button" onClick={nextStep} className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Next
            </button>
          )}
          {step === steps.length - 1 && (
            <button type="submit" disabled={loading} className="ml-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              {loading ? "Uploading..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Reusable Components
const InputField = ({ label, name, value, onChange, required = false, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
        error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const TextAreaField = ({ label, name, value, onChange, required = false, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={4}
      placeholder="Describe the application in detail..."
      className={`w-full px-3 py-2 border rounded resize-y focus:outline-none focus:ring-2 ${
        error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FileInput = ({ label, name, onChange, preview, required = false, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="file"
      name={name}
      onChange={onChange}
      accept="image/*"
      required={required}
      className="w-full text-gray-700 mb-2"
    />
    {preview && <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded border" />}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">{title}</h2>
);

export default UploadProduct;
