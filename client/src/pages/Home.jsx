import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  AiOutlineCheckCircle,
  AiOutlineSafetyCertificate,
  AiOutlineThunderbolt,
} from "react-icons/ai";
import {
  hero1,
  hero2,
  hero3,
  food,
  oil,
  pharma,
  auto,
  building,
} from "../assets";

function Home() {
  const [products, setProducts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data.slice(0, 8));
    });
  }, []);

  const handleViewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const slides = [
    {
      id: 1,
      img: hero1,
      title: "ENGINEERED TO SEAL",
      subtitle: "Innovative sealing solutions for demanding industries.",
    },
    {
      id: 2,
      img: hero2,
      title: "PRECISION IN EVERY TURN",
      subtitle: "Crafted with accuracy and efficiency in mind.",
    },
    {
      id: 3,
      img: hero3,
      title: "RELIABLE UNDER PRESSURE",
      subtitle: "Sealing technology that performs under extreme conditions.",
    },
  ];

  const industries = [
    { id: 1, name: "Pharmaceutical", img: pharma },
    { id: 2, name: "Chemicals", img: oil },
    { id: 3, name: "Food Processing", img: food },
    { id: 4, name: "Refineries", img: auto },
    { id: 5, name: "Marines", img: pharma },
    { id: 6, name: "Fertilizers", img: oil },
    { id: 7, name: "PowerPlants", img: food },
    { id: 8, name: "Petrochemicals", img: auto },
  ];

  return (
    <div>
      {/* Hero Section Desktop View */}
      <div className="hidden md:block">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          loop
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative h-[80vh] w-full bg-center bg-cover"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                {activeSlide === index && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-2xl drop-shadow">{slide.subtitle}</p>
                  </motion.div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Hero Section Mobile View */}
      <div className="block md:hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-[19vh] w-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${slide.img})` }}>
                {activeSlide === index && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 className="text-2xl font-bold mb-2 drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-sm drop-shadow">{slide.subtitle}</p>
                  </motion.div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center text-white max-w-4xl mx-auto">
                {activeSlide === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl drop-shadow-md max-w-3xl mx-auto">
                      {slide.subtitle}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom styled navigation buttons */}
        <div className="swiper-button-prev text-white opacity-80 hover:opacity-100 transition-opacity" />
        <div className="swiper-button-next text-white opacity-80 hover:opacity-100 transition-opacity" />
      </Swiper>

      {/* Info Section */}
      <section className="py-16 px-4 md:px-12 bg-white">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-blue-600 font-semibold text-sm">
              GET THE RIGHT SOLUTION FOR
            </h3>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Mechanical Seals
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We have been one of the leading and most experienced
              manufacturers, exporters, and trusted suppliers in the mechanical
              seals industry for the last 25 years, as Hydrexa...
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <AiOutlineCheckCircle className="text-blue-500 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Quality Assurance
                  </h4>
                  <p className="text-gray-600 text-sm">
                    All product verify by QC Department.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AiOutlineSafetyCertificate className="text-blue-500 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Certified Products
                  </h4>
                  <p className="text-gray-600 text-sm">
                    All products are certified by ISO Certification.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AiOutlineThunderbolt className="text-blue-500 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Quick Service</h4>
                  <p className="text-gray-600 text-sm">
                    Quick Service regarding our product at door steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src={building}
              alt="Company Building"
              className="rounded-2xl shadow-lg object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-16 px-4 md:px-12 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="relative group rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleViewProduct(product._id)}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-semibold text-lg">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="text-blue-500 text-sm font-medium uppercase mb-1">
                    {product.type}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 px-4 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={industry.img}
                  alt={industry.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 bg-white text-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {industry.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
