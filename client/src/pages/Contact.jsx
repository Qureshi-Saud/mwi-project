// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
// import { fadeUp } from "./About";

// const Contact = () => {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     countryCode: "+91",
//     phone: "",
//     companyName: "",
//     subject: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);

//   const handlePhoneChange = (e) => {
//     const onlyNums = e.target.value.replace(/[^0-9]/g, "");
//     setForm({ ...form, phone: onlyNums });
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!form.firstName.trim()) newErrors.firstName = "First name is required";
//     if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

//     if (!form.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = "Enter a valid email address";
//     }

//     if (!form.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(form.phone)) {
//       newErrors.phone = "Phone must be exactly 10 digits";
//     }

//     if (!form.subject.trim()) newErrors.subject = "Subject is required";
//     if (!form.message.trim()) newErrors.message = "Message is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     if (
//       form.firstName &&
//       form.lastName &&
//       form.email &&
//       form.phone &&
//       form.subject &&
//       form.message &&
//       Object.keys(errors).length === 0
//     ) {
//       setSuccess(true);

//       setForm({
//         firstName: "",
//         lastName: "",
//         email: "",
//         countryCode: "+91",
//         phone: "",
//         companyName: "",
//         subject: "",
//         message: "",
//       });

//       setTimeout(() => setSuccess(false), 4000);
//     }
//   };

//   return (
//     <div className="bg-white text-gray-800 font-sans">
//       {/* Hero Section */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeUp}
//         className="bg-blue-900 text-white text-center py-20 px-6 mb-12"
//       >
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
//           Contact Us
//         </h1>
//       </motion.section>

//       <motion.div
//         className="flex flex-wrap justify-center gap-6 px-4 w-full max-w-7xl mx-auto mb-12"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         {/* Left Info Section */}
//         <motion.div
//           className="w-full md:w-[48%] bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-lg space-y-4"
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-3xl font-bold text-gray-700">
//             Get In <span className="text-blue-700">Touch</span>
//           </h2>
//           <p className="text-gray-600">We're here to help you…</p>

//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-gray-700">
//               <FaMapMarkerAlt className="text-blue-600" />
//               <span>
//                 <strong>Main Branch:</strong> B-3, Pandit Jawaharlal Nehru Rd,
//                 Patel Park, Vakola, Santacruz East, Mumbai, MH 400055
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <FaMapMarkerAlt className="text-blue-600" />
//               <span>
//                 <strong>Branch 1:</strong> 4RVP+4P8, Adarsh Nagar, Jogeshwari
//                 West, Mumbai, Maharashtra 400102
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <FaMapMarkerAlt className="text-blue-600" />
//               <span>
//                 <strong>Branch 2:</strong> Rizvi Educational Complex, Off Carter
//                 Rd, Rizvi Complex, Chuim, Bandra West, Mumbai, Maharashtra
//                 400050
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <FaPhone className="text-green-600" />
//               <span>+91 7715068534 | +91 9988776655</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <FaEnvelope className="text-red-600" />
//               <span>only4rizvi@gmail.com</span>
//             </div>
//           </div>

//           <iframe
//             title="Microwell Industries Location"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.364561196013!2d72.84898491490399!3d19.135844387058887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c86de9e09b61%3A0x5f27dbceab1e26e9!2sPatel%20Park%2C%20Santacruz%20East%2C%20Mumbai%2C%20Maharashtra%20400055!5e0!3m2!1sen!2sin!4v1697039354174!5m2!1sen!2sin"
//             className="w-full h-44 rounded-md border border-gray-300"
//             allowFullScreen=""
//             loading="lazy"
//           ></iframe>
//         </motion.div>

//         {/* Right Form Section */}
//         <motion.form
//           onSubmit={handleSubmit}
//           className="w-full md:w-[48%] bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-8 space-y-6"
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="text-center mb-6">
//             <h2 className="text-xl md:text-2xl font-medium text-gray-700">
//               Have any questions?
//             </h2>
//             <h2 className="text-x md:text-xl font-medium text-blue-700">
//               Send us a message.
//             </h2>
//           </div>

//           {success && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center animate-pulse">
//               ✅ Your message has been submitted!
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-medium">
//                 First Name<span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={form.firstName}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="First Name"
//               />
//               {errors.firstName && (
//                 <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium">
//                 Last Name<span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={form.lastName}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Last Name"
//               />
//               {errors.lastName && (
//                 <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">
//               Email<span className="text-red-600">*</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="your@email.com"
//             />
//             {errors.email && (
//               <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Phone<span className="text-red-600">*</span>
//             </label>
//             <div className="flex gap-2">
//               <select
//                 name="countryCode"
//                 value={form.countryCode}
//                 onChange={handleChange}
//                 className="w-1/3 border border-gray-300 rounded-lg p-2 focus:outline-none"
//               >
//                 <option value="+91">+91 (India)</option>
//                 <option value="+1">+1 (USA)</option>
//                 <option value="+44">+44 (UK)</option>
//               </select>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={form.phone}
//                 onChange={handlePhoneChange}
//                 maxLength={10}
//                 className="w-3/4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="1234567890"
//               />
//             </div>
//             {errors.phone && (
//               <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">
//               Company Name
//             </label>
//             <input
//               type="text"
//               name="companyName"
//               value={form.companyName}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Your Company"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">
//               Purpose<span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               name="subject"
//               value={form.subject}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Purpose of your message"
//             />
//             {errors.subject && (
//               <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">
//               Message<span className="text-red-600">*</span>
//             </label>
//             <textarea
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               rows="2"
//               className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Write your message here..."
//             />
//             {errors.message && (
//               <p className="text-red-600 text-sm mt-1">{errors.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={
//               !form.firstName ||
//               !form.lastName ||
//               !form.email ||
//               !form.phone ||
//               !form.subject ||
//               !form.message
//             }
//             className={`w-full font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 ${
//               !form.firstName ||
//               !form.lastName ||
//               !form.email ||
//               !form.phone ||
//               !form.subject ||
//               !form.message
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:from-blue-700 hover:to-purple-700 text-white"
//             }`}
//           >
//             Send Message
//           </button>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// };

// export default Contact;



import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion"

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    companyName: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setForm({ ...form, phone: onlyNums });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setSuccess(true);

        setForm({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "+91",
          phone: "",
          companyName: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setSuccess(false);
          setSubmitted(false);
        }, 4000);
      } else {
        alert(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden w-full bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex flex-col items-center">
      <motion.section
        className="w-screen bg-blue-900 text-white text-center py-20 px-16 mb-5 -mt-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        data-aos="fade-up"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Contact Us
        </h1>
      </motion.section>

      <div
        className="w-full max-w-7xl flex flex-col md:flex-row gap-4 items-start justify-center"
        data-aos="fade-up"
      >
        {/* Left Info Section */}
        <div
          className="w-full md:w-1/2 bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-lg space-y-4"
          data-aos="fade-right"
        >
          <h2 className="text-3xl font-bold text-gray-700">
            Get In <span className="text-blue-700">Touch</span>
          </h2>

          <p className="text-gray-600">We're here to help you…</p>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>
                <strong>Main Branch:</strong> B-3, Pandit Jawaharlal Nehru Rd,
                Patel Park, Vakola, Santacruz East, Mumbai, MH 400055
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>
                <strong>Branch 1:</strong> 4RVP+4P8, Adarsh Nagar, Jogeshwari
                West, Mumbai, Maharashtra 400102
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>
                <strong>Branch 2:</strong> Rizvi Educational Complex, Off Carter
                Rd, Rizvi Complex, Chuim, Bandra West, Mumbai, Maharashtra
                400050
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaPhone className="text-green-600" />
              <span>+91 7715068534 | +91 9988776655</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="text-red-600" />
              <span>only4rizvi@gmail.com</span>
            </div>
          </div>

          <iframe
            title="Microwell Industries Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.364561196013!2d72.84898491490399!3d19.135844387058887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c86de9e09b61%3A0x5f27dbceab1e26e9!2sPatel%20Park%2C%20Santacruz%20East%2C%20Mumbai%2C%20Maharashtra%20400055!5e0!3m2!1sen!2sin!4v1697039354174!5m2!1sen!2sin"
            className="w-full h-44 rounded-md border border-gray-300"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Right Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-8 space-y-6"
          data-aos="fade-left"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-medium text-gray-700">
              Have any questions?
            </h2>
            <h2 className="text-x md:text-xl font-medium text-blue-700">
              Send us a message.
            </h2>
          </div>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center animate-pulse">
              Thanks for contacting us! We will be in touch with you shortly.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">
                First Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Last Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="w-1/4 border border-gray-300 rounded-lg p-2 focus:outline-none"
              >
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handlePhoneChange}
                maxLength={10}
                className="w-3/4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="1234567890"
              />
            </div>
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Company"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Purpose<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Purpose of your message"
            />
            {errors.subject && (
              <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Message<span className="text-red-600">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="2"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your message here..."
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              !form.firstName ||
              !form.lastName ||
              !form.email ||
              !form.phone ||
              !form.subject ||
              !form.message
            }
            className={`w-full font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 ${
              loading ||
              !form.firstName ||
              !form.lastName ||
              !form.email ||
              !form.phone ||
              !form.subject ||
              !form.message
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:from-blue-700 hover:to-purple-700 text-white"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;