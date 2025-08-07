import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import {
  IoIosArrowDropdown,
  IoIosArrowDropleft,
  IoIosArrowDropright,
} from "react-icons/io";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState({
    materials: false,
    limits: false,
    application: false,
  });

  const swiperRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="ml-64 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-950 text-white py-20 text-center shadow-md">
        <h2 className="text-5xl font-extrabold mb-3 tracking-tight">
          Our Products
        </h2>
        <p className="text-lg text-blue-200">
          Explore the specs, limits, and power of our solutions.
        </p>
      </section>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white mt-[-50px] rounded-xl shadow-lg relative z-10">
        {/* Left Side: Text */}
        <div>
          <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
            TYPE {product.type}
          </span>

          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            {product.name}
          </h3>

          {/* Dropdowns */}
          <div className="space-y-6 text-gray-700">
            {/* Materials */}
            <div>
              <button
                onClick={() =>
                  setOpen((prev) => ({ ...prev, materials: !prev.materials }))
                }
                className="w-full flex justify-between items-center text-left font-semibold text-xl text-blue-800"
              >
                <span>🔩 Materials</span>
                <IoIosArrowDropdown
                  className={`text-2xl transition-transform duration-300 ${
                    open.materials ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open.materials && (
                <ul className="list-disc list-inside mt-2 text-gray-600 text-m ml-2">
                  {product.materials?.sealRingFaces && (
                    <li>
                      <strong>Seal Ring Faces:</strong>{" "}
                      {product.materials.sealRingFaces}
                    </li>
                  )}
                  {product.materials?.seatFaces && (
                    <li>
                      <strong>Seat Faces:</strong>{" "}
                      {product.materials.seatFaces}
                    </li>
                  )}
                  {product.materials?.elastomer && (
                    <li>
                      <strong>Elastomer:</strong> {product.materials.elastomer}
                    </li>
                  )}
                  {product.materials?.moc && (
                    <li>
                      <strong>MOC:</strong> {product.materials.moc}
                    </li>
                  )}
                  {product.materials?.bellowMoc && (
                    <li>
                      <strong>Bellow MOC:</strong>{" "}
                      {product.materials.bellowMoc}
                    </li>
                  )}
                  {product.materials?.endFittingMoc && (
                    <li>
                      <strong>End Fitting MOC:</strong>{" "}
                      {product.materials.endFittingMoc}
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Operating Limits */}
            <div>
              <button
                onClick={() =>
                  setOpen((prev) => ({ ...prev, limits: !prev.limits }))
                }
                className="w-full flex justify-between items-center text-left font-semibold text-xl text-blue-800"
              >
                <span>⚙️ Operating Limits</span>
                <IoIosArrowDropdown
                  className={`text-2xl transition-transform duration-300 ${
                    open.limits ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open.limits && (
                <ul className="list-disc list-inside mt-2 text-gray-600 text-m ml-2">
                  {product.operatingLimits?.shaftDia && (
                    <li>
                      <strong>Shaft Dia.:</strong>{" "}
                      {product.operatingLimits.shaftDia}
                    </li>
                  )}
                  {product.operatingLimits?.pressure && (
                    <li>
                      <strong>Pressure:</strong>{" "}
                      {product.operatingLimits.pressure}
                    </li>
                  )}
                  {product.operatingLimits?.temperature && (
                    <li>
                      <strong>Temperature:</strong>{" "}
                      {product.operatingLimits.temperature}
                    </li>
                  )}
                  {product.operatingLimits?.speed && (
                    <li>
                      <strong>Speed:</strong> {product.operatingLimits.speed}
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Application */}
            <div>
              <button
                onClick={() =>
                  setOpen((prev) => ({
                    ...prev,
                    application: !prev.application,
                  }))
                }
                className="w-full flex justify-between items-center text-left font-semibold text-xl text-blue-800"
              >
                <span>📦 Application</span>
                <IoIosArrowDropdown
                  className={`text-2xl transition-transform duration-300 ${
                    open.application ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open.application && (
                <p className="mt-2 text-gray-600">{product.application}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Images  */}
        <div className="flex flex-col items-center gap-6 relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
            modules={[Navigation, Autoplay, EffectFade]}
            effect="fade"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full max-w-lg mx-auto relative"
          >
            {product.image && (
              <SwiperSlide>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[350px] w-full object-contain rounded-xl shadow-lg"
                />
              </SwiperSlide>
            )}
            {product.image2 && (
              <SwiperSlide>
                <img
                  src={product.image2}
                  alt={`${product.name} - Additional`}
                  className="h-[350px] w-full object-contain rounded-xl shadow-lg"
                />
              </SwiperSlide>
            )}

            {/* Left Arrow */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
            >
              <IoIosArrowDropleft className="text-3xl text-white drop-shadow hover:scale-125 transition-transform duration-200" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10"
            >
              <IoIosArrowDropright className="text-3xl text-white drop-shadow hover:scale-125 transition-transform duration-200" />
            </button>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;