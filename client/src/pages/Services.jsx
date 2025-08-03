import React from "react";
import { motion } from "framer-motion";
import {
  service,
  service1,
  service2,
  Seal,
} from "../assets";
import {
  FaSnowflake,
  FaTools,
  FaStore,
  FaCogs,
  FaLayerGroup,
  FaCheck,
} from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Services() {
  const services = [
    {
      image: service,
      title: "Custom Design",
      description: "Tailored sealing solutions for your exact needs.",
    },
    {
      image: service1,
      title: "Installation",
      description: "Professional installation ensuring reliability.",
    },
    {
      image: service2,
      title: "Maintenance",
      description: "Ongoing support to keep systems running.",
    },
  ];

  const leftItems = [
    { icon: <FaSnowflake className="text-blue-400" />, text: "CUSTOM ENGINEERING" },
    { icon: <FaStore className="text-black" />, text: "ONSITE SUPPORT" },
    { icon: <FaCogs className="text-black" />, text: "CUSTOM DESIGNED SEALS" },
  ];

  const rightItems = [
    { icon: <FaTools className="text-black" />, text: "MECHANICAL SEAL REPAIR" },
    { icon: <FaLayerGroup className="text-black" />, text: "CARBON, SPLIT CARBON SEALS" },
    { icon: <FaCheck className="text-black" />, text: "TESTING & INSPECTION" },
  ];

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Section Header */}
      <section className="w-full bg-blue-900 text-white text-center py-20 px-4 md:px-6 mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="max-w-2xl mx-auto">
          We believe in client satisfaction through best service.
        </p>
      </section>

      {/* Service Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-4 md:px-6 max-w-screen-xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:border-blue-400 hover:border-2 transition duration-300 text-center p-6"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              {service.title}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Seal and Side Services */}
      <div className="flex flex-wrap justify-center items-center px-4 md:px-10 py-20 gap-10 bg-gray-50 max-w-screen-xl mx-auto">
        {/* Left Column */}
        <div className="flex flex-col gap-8 items-center text-center">
          {leftItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group flex flex-col items-center gap-3 text-xl font-semibold uppercase"
            >
              <span className="text-4xl">{item.icon}</span>
              <span className="text-lg md:text-xl text-gray-800 max-w-[180px] group-hover:text-blue-600 group-hover:underline transition duration-300">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Center Image */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-full border-8 border-blue-300 p-6 bg-white shadow-xl hover:shadow-blue-300 transition-shadow duration-300">
            <img
              src={Seal}
              alt="Mechanical Seal"
              className="w-full max-w-[360px] object-contain"
            />
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="flex flex-col gap-8 items-center text-center">
          {rightItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group flex flex-col items-center gap-3 text-xl font-semibold uppercase"
            >
              <span className="text-4xl">{item.icon}</span>
              <span className="text-lg md:text-xl text-gray-800 max-w-[200px] group-hover:text-blue-600 group-hover:underline transition duration-300">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
