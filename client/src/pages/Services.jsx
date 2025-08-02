// import React from "react";
// import {service,service1,service2} from "../assets";


// function Services() {
//   const services = [
//     {
//       image: service,
//       title: "Custom Design",
//       description: "Tailored sealing solutions for your exact needs.",
//     },
//     {
//       image: service1,
//       title: "Installation",
//       description: "Professional installation ensuring reliability.",
//     },
//     {
//       image: service2,
//       title: "Maintenance",
//       description: "Ongoing support to keep systems running.",
//     },
//   ];

//   return (
//     <div className="bg-white text-gray-800 font-sans">
//       <section className="w-full bg-blue-900 text-white text-center py-20 px-6 mb-20">
//     <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
//       Our Services
//     </h1>
//     <p className="text-center text-white max-w-2xl mx-auto">
//       We believe in client satisfaction through best service.
//     </p>
//   </section>

//       <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 text-center p-6"
//           >
//             <img
//               src={service.image}
//               alt={service.title}
//               className="w-full h-52 object-cover rounded-xl mb-4"
//             />
//             <h3 className="text-2xl font-semibold mb-2 text-gray-800">
//               {service.title}
//             </h3>
//             <p className="text-gray-600">{service.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Services;


import React from "react";
import {
  service,
  service1,
  service2,
  Seal, // Make sure this is imported correctly
} from "../assets";
import {
  FaSnowflake,
  FaTools,
  FaStore,
  FaCogs,
  FaLayerGroup,
  FaCheck,
} from "react-icons/fa";

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
      <section className="w-full bg-blue-900 text-white text-center py-20 px-6 mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="max-w-2xl mx-auto">
          We believe in client satisfaction through best service.
        </p>
      </section>

      {/* Services Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-24 px-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 text-center p-6"
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
          </div>
        ))}
      </div>

      {/* Seal Image with Side Services */}
      <div className="flex flex-col md:flex-row justify-center items-center px-6 md:px-20 py-20 gap-20 bg-gray-50">
        {/* Left Column */}
        <div className="flex flex-col gap-14 items-end text-right">
          {leftItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-xl font-semibold uppercase">
              <span className="text-2xl">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="flex justify-center items-center">
          <img
            src={Seal}
            alt="Mechanical Seal"
            className="w-[280px] md:w-[360px] lg:w-[400px]"
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-14 items-start text-left">
          {rightItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-xl font-semibold uppercase">
              <span className="text-2xl">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
