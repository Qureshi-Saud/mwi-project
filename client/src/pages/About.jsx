// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import about from "../assets/about.png";
// import { FaCheckCircle } from "react-icons/fa";

// function About() {
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   return (
//     <div className="bg-white text-gray-800 font-sans">
//       {/* Hero Section */}
//       <section className="bg-blue-900 from-blue-900 to-sky-700 text-white text-center py-20 px-6" data-aos="fade-down">
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">About <span className="text-yellow-400">Microwell Industries</span></h1>
//         <p className="text-xl opacity-90">Discover who we are, what we build, and why we lead.</p>
//       </section>

//       {/* Image + Who We Are */}
//       <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
//         <div data-aos="zoom-in-right">
//           <img src={about} alt="About Microwell" className="w-full rounded-3xl shadow-2xl" />
//         </div>
//         <div data-aos="fade-left">
//           <h2 className="text-4xl font-bold mb-4 text-blue-900">Who We Are</h2>
//           <p className="text-lg text-gray-700 leading-relaxed">
//             <strong>Microwell Industries</strong> is a pioneer in the manufacturing of Mechanical Seals, built with top-grade materials in our modern facility. 
//             Our professional team ensures unmatched product quality and reliable after-sales support.
//           </p>
//         </div>
//       </section>

//       {/* Quality & Leadership */}
//       <section className="bg-gray-50 py-20 px-6">
//         <div className="max-w-6xl mx-auto space-y-14">
//           <div className="text-center" data-aos="fade-up">
//             <h3 className="text-3xl font-bold text-blue-800 mb-3">Quality & Innovation</h3>
//             <p className="text-gray-700 text-lg max-w-3xl mx-auto">
//               We continuously update our product line to meet evolving market needs through advanced R&D and strict quality control. Timely delivery and a seamless client experience are at the heart of our service.
//             </p>
//           </div>

//           <div className="text-center" data-aos="fade-up" data-aos-delay="100">
//             <h3 className="text-3xl font-bold text-blue-800 mb-3">Leadership That Drives</h3>
//             <p className="text-gray-700 text-lg max-w-3xl mx-auto">
//               Under the leadership of <strong>Mr. Kadiwal Mohammad</strong>, our journey has been marked by vision, resilience, and growth in a highly competitive industry.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Product Portfolio */}
//       <section className="py-20 px-6 bg-gradient-to-br from-sky-50 to-white" data-aos="fade-up">
//         <div className="max-w-6xl mx-auto text-center">
//           <h3 className="text-3xl font-bold text-blue-900 mb-6">Product Portfolio</h3>
//           <p className="text-gray-700 text-lg max-w-4xl mx-auto mb-8">
//             Our seals are trusted across industries — from automobiles to aerospace — known for their high performance, durability, and precision.
//           </p>
//           <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
//             {[
//               "Precision-engineered and industry-compliant",
//               "Custom sizes and specifications available",
//               "Built with high-efficiency materials",
//               "Affordable pricing for all scales",
//             ].map((item, i) => (
//               <p key={i} className="flex items-start gap-3 text-gray-700 text-lg">
//                 <FaCheckCircle className="text-blue-600 mt-1" /> {item}
//               </p>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Team */}
//       <section className="py-20 px-6 bg-white" data-aos="fade-up">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-3xl font-bold text-blue-900 mb-6">Our Team</h3>
//           <p className="text-lg text-gray-700 leading-relaxed">
//             Our expert team is our strongest asset. With deep market understanding and technical excellence, 
//             they work hand-in-hand with clients to deliver tailored solutions and ensure complete satisfaction.
//           </p>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-20 bg-gray-100 px-6" data-aos="fade-up">
//         <div className="max-w-6xl mx-auto text-center">
//           <h3 className="text-3xl font-bold mb-10 text-blue-900">Why Choose Us?</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               "Premium quality components",
//               "State-of-the-art infrastructure",
//               "Skilled technical workforce",
//               "Fully customized solutions",
//               "Assured on-time delivery",
//               "Competitive pricing",
//             ].map((point, i) => (
//               <div
//                 key={i}
//                 className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border"
//               >
//                 <p className="text-gray-700 text-lg flex items-start gap-2">
//                   <FaCheckCircle className="text-green-500 mt-1" />
//                   {point}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission / Vision */}
//       <section className="py-16 px-6">
//         <div
//           className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 text-center p-10"
//           data-aos="fade-up"
//         >
//           <h3 className="text-2xl font-bold mb-4 text-blue-900">Our Mission / Vision</h3>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             To be the most trusted and innovative provider of mechanical seals by delivering unmatched quality,
//             precision, and service. We never compromise on excellence and always uphold integrity in every product we deliver.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default About;

import React from "react";
import { motion } from "framer-motion";
import about from "../assets/about.png";
import { FaCheckCircle } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-blue-900 text-white text-center py-20 px-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          About <span className="text-yellow-400">Microwell Industries</span>
        </h1>
        <p className="text-xl opacity-90">Discover who we are, what we build, and why we lead.</p>
      </motion.section>

      {/* Who We Are */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img src={about} alt="About Microwell" className="w-full rounded-3xl shadow-2xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-blue-900">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Microwell Industries</strong> is a pioneer in the manufacturing of Mechanical Seals,
            built with top-grade materials in our modern facility. Our professional team ensures unmatched
            product quality and reliable after-sales support.
          </p>
        </motion.div>
      </section>

      {/* Quality & Leadership */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-14 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-3xl font-bold text-blue-800 mb-3">Quality & Innovation</h3>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              We continuously update our product line to meet evolving market needs through advanced R&D and strict quality control.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
          >
            <h3 className="text-3xl font-bold text-blue-800 mb-3">Leadership That Drives</h3>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Under the leadership of <strong>Mr. Kadiwal Mohammad</strong>, our journey has been marked by vision, resilience, and growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Portfolio */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20 px-6 bg-gradient-to-br from-sky-50 to-white"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-blue-900 mb-6">Product Portfolio</h3>
          <p className="text-gray-700 text-lg max-w-4xl mx-auto mb-8">
            Our seals are trusted across industries — from automobiles to aerospace — known for their high performance, durability, and precision.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
            {[
              "Precision-engineered and industry-compliant",
              "Custom sizes and specifications available",
              "Built with high-efficiency materials",
              "Affordable pricing for all scales",
            ].map((item, i) => (
              <motion.p
                key={i}
                className="flex items-start gap-3 text-gray-700 text-lg"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <FaCheckCircle className="text-blue-600 mt-1" />
                {item}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Team */}
      <motion.section
        className="py-20 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-blue-900 mb-6">Our Team</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our expert team is our strongest asset. With deep market understanding and technical excellence, they work hand-in-hand with clients to deliver tailored solutions.
          </p>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-100 px-6">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h3 className="text-3xl font-bold mb-10 text-blue-900">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Premium quality components",
              "State-of-the-art infrastructure",
              "Skilled technical workforce",
              "Fully customized solutions",
              "Assured on-time delivery",
              "Competitive pricing",
            ].map((point, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="text-gray-700 text-lg flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Mission / Vision */}
      <motion.section
        className="py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 text-center p-10">
          <h3 className="text-2xl font-bold mb-4 text-blue-900">Our Mission / Vision</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            To be the most trusted and innovative provider of mechanical seals by delivering unmatched quality, precision, and service.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
