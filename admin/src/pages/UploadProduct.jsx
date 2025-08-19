import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";

const steps = ["Product Details", "Materials", "Operating Limits", "Upload Images", "Review"];

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <div className="ml-64 px-6 py-12 min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl space-y-10">
        {/* Step Tracker */}
        <div className="flex justify-between items-center px-4">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`mx-auto w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition duration-300 ease-in-out ${
                  index === step
                    ? "bg-blue-600 text-white scale-110 shadow-lg"
                    : index < step
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <p className={`text-xs mt-1 font-medium ${index === step ? "text-blue-600" : "text-gray-600"}`}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl px-10 py-12 space-y-10"
        >
          {/* Dynamic Step Content */}
          {step === 0 && (
            <>
              <SectionTitle title="Product Details" />
              <InputField label="Product Name" name="name" value={form.name} onChange={handleChange} error={formErrors.name} />
              <InputField label="Type" name="type" value={form.type} onChange={handleChange} error={formErrors.type} />
              <TextAreaField label="Application" name="application" value={form.application} onChange={handleChange} error={formErrors.application} />
            </>
          )}
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
          {step === 2 && (
            <>
              <SectionTitle title="Operating Limits" />
              <InputField label="Shaft Dia." name="shaftDia" value={form.shaftDia} onChange={handleChange} />
              <InputField label="Pressure" name="pressure" value={form.pressure} onChange={handleChange} />
              <InputField label="Temperature" name="temperature" value={form.temperature} onChange={handleChange} />
              <InputField label="Speed" name="speed" value={form.speed} onChange={handleChange} />
            </>
          )}
          {step === 3 && (
            <>
              <SectionTitle title="Upload Images" />
              <FileInput label="Primary Image *" name="image" onChange={handleFileChange} preview={previews.image} error={formErrors.image} />
              <FileInput label="Secondary Image" name="image2" onChange={handleFileChange} preview={previews.image2} />
            </>
          )}
          {step === 4 && (
            <>
              <SectionTitle title="Review" />
              <ReviewSection form={form} previews={previews} setStep={setStep} />
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-center pt-6">
            {step > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Next
              </button>
            )}
            {step === steps.length - 1 && (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// Components
const SectionTitle = ({ title }) => (
  <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">{title}</h2>
);

const InputField = ({ label, name, value, onChange, error }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition ${
        error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
      }`}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const TextAreaField = ({ label, name, value, onChange, error }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className={`w-full px-4 py-2 border rounded-lg shadow-sm resize-y focus:outline-none focus:ring-2 transition ${
        error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
      }`}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const FileInput = ({ label, name, onChange, preview, error }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center space-x-4">
      <label className="flex items-center gap-3 bg-white border-2 border-dashed border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:border-blue-400 transition">
        <ImageIcon className="h-5 w-5 text-blue-600" />
        <span className="text-sm text-gray-700">Choose file</span>
        <input
          type="file"
          name={name}
          onChange={onChange}
          accept="image/*"
          className="hidden"
        />
      </label>
      {preview && (
        <img
          src={preview}
          alt={name}
          className="h-24 w-24 object-cover border rounded-md shadow-md hover:scale-105 transition-transform"
        />
      )}
    </div>
    <p className="text-xs text-gray-500">JPG, PNG, or WEBP. Max size: 2MB.</p>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const ReviewSection = ({ form, previews, setStep }) => {
  const sections = [
    {
      title: "Product Details",
      step: 0,
      fields: [
        { label: "Product Name", key: "name" },
        { label: "Type", key: "type" },
        { label: "Application", key: "application" },
      ],
    },
    {
      title: "Materials",
      step: 1,
      fields: [
        { label: "Seal Ring Faces", key: "sealRingFaces" },
        { label: "Seat Faces", key: "seatFaces" },
        { label: "Elastomer", key: "elastomer" },
        { label: "MOC", key: "moc" },
        { label: "Bellow MOC", key: "bellowMoc" },
        { label: "End Fitting MOC", key: "endFittingMoc" },
      ],
    },
    {
      title: "Operating Limits",
      step: 2,
      fields: [
        { label: "Shaft Diameter", key: "shaftDia" },
        { label: "Pressure", key: "pressure" },
        { label: "Temperature", key: "temperature" },
        { label: "Speed", key: "speed" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map(({ title, step, fields }) => (
        <div key={title} className="border border-gray-200 rounded-lg shadow-sm p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <button
              type="button"
              onClick={() => setStep(step)}
              className="text-blue-600 text-sm hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
            {fields.map(({ label, key }) => (
              <div key={key}>
                <span className="font-medium">{label}:</span> {form[key] || <span className="text-gray-400">—</span>}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Images Section */}
      <div className="border border-gray-200 rounded-lg shadow-sm p-4 bg-gray-50">
        <h3 className="font-semibold text-gray-800 mb-3">Images</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">Primary Image:</p>
            {previews.image ? (
              <img
                src={previews.image}
                alt="Primary"
                className="h-36 w-36 object-cover border-2 border-blue-400 rounded-lg shadow-md hover:scale-105 transition"
              />
            ) : (
              <p className="text-gray-400">No image uploaded</p>
            )}
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">Secondary Image:</p>
            {previews.image2 ? (
              <img
                src={previews.image2}
                alt="Secondary"
                className="h-36 w-36 object-cover border-2 border-gray-400 rounded-lg shadow-md hover:scale-105 transition"
              />
            ) : (
              <p className="text-gray-400">No image uploaded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
