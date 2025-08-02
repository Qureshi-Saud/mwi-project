import React from "react";
import {service,service1,service2} from "../assets";


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

  return (
    <div className="bg-white text-gray-800 font-sans">
      <section className="w-full bg-blue-900 text-white text-center py-20 px-6 mb-20">
    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
      Our Services
    </h1>
    <p className="text-center text-white max-w-2xl mx-auto">
      We believe in client satisfaction through best service.
    </p>
  </section>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
    </div>
  );
}

export default Services;
