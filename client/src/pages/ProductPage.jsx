import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Gauge, Thermometer, Wind, Ruler } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products`)
      .then((res) => {
        const others = res.data.filter((p) => String(p._id) !== String(id));
        const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);
        setOtherProducts(shuffled);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [id]);

  if (!product)
    return (
      <div className="p-10 text-center text-gray-500 text-lg">Loading...</div>
    );

  return (
    <div className="bg-white min-h-screen px-4 md:px-8 py-10 max-w-7xl mx-auto">
      {/* Breadcrumb + Title */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/products" className="hover:text-blue-600 transition">
            Products
          </Link>{" "}
          / <span className="text-gray-800 font-semibold">{product.name}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          {product.name}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          {product.application}
        </p>
      </motion.div>

      {/* Product Image(s) + Operating Limits */}
      <motion.div
        className="grid lg:grid-cols-2 gap-12 mb-20 items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Product Images */}
        <div className="flex justify-center">
          <div className="p-6 bg-gray-50 border rounded-2xl shadow-sm w-full">
            {product.images && product.images.length > 1 ? (
              <Swiper
                spaceBetween={10}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="rounded-xl"
              >
                {product.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={product.name}
                      className="w-full h-80 object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                src={
                  product.images?.[0] ||
                  product.image ||
                  "/placeholder.jpg"
                }
                alt={product.name}
                className="w-72 h-72 object-contain mx-auto"
              />
            )}
          </div>
        </div>

        {/* Operating Limits */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Operating Limits
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Ruler className="w-5 h-5 text-blue-600" />
              <span>
                <strong>Shaft Dia:</strong> {product.operatingLimits?.shaftDia}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Gauge className="w-5 h-5 text-indigo-600" />
              <span>
                <strong>Pressure:</strong> {product.operatingLimits?.pressure}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Thermometer className="w-5 h-5 text-red-500" />
              <span>
                <strong>Temperature:</strong>{" "}
                {product.operatingLimits?.temperature}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Wind className="w-5 h-5 text-green-600" />
              <span>
                <strong>Speed:</strong> {product.operatingLimits?.speed}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Materials of Construction + Second Image */}
      <motion.div
        className="grid lg:grid-cols-2 gap-12 mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Materials */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Material of Construction
          </h2>
          <div className="border rounded-lg overflow-hidden">
            <dl className="divide-y divide-gray-200">
              {product.materials?.sealRingFaces && (
                <div className="px-4 py-3 bg-gray-50 flex justify-between">
                  <dt className="font-medium text-gray-700">Seal Ring Faces</dt>
                  <dd className="text-gray-600">
                    {product.materials.sealRingFaces}
                  </dd>
                </div>
              )}
              {product.materials?.seatFaces && (
                <div className="px-4 py-3 flex justify-between">
                  <dt className="font-medium text-gray-700">Seat Faces</dt>
                  <dd className="text-gray-600">
                    {product.materials.seatFaces}
                  </dd>
                </div>
              )}
              {product.materials?.elastomer && (
                <div className="px-4 py-3 bg-gray-50 flex justify-between">
                  <dt className="font-medium text-gray-700">Elastomer</dt>
                  <dd className="text-gray-600">
                    {product.materials.elastomer}
                  </dd>
                </div>
              )}
              {product.materials?.moc && (
                <div className="px-4 py-3 flex justify-between">
                  <dt className="font-medium text-gray-700">MOC</dt>
                  <dd className="text-gray-600">{product.materials.moc}</dd>
                </div>
              )}
              {product.materials?.bellowMoc && (
                <div className="px-4 py-3 bg-gray-50 flex justify-between">
                  <dt className="font-medium text-gray-700">Bellow MOC</dt>
                  <dd className="text-gray-600">
                    {product.materials.bellowMoc}
                  </dd>
                </div>
              )}
              {product.materials?.endFittingMoc && (
                <div className="px-4 py-3 flex justify-between">
                  <dt className="font-medium text-gray-700">
                    End Fitting MOC
                  </dt>
                  <dd className="text-gray-600">
                    {product.materials.endFittingMoc}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Second Image (fallback if not in images array) */}
        {product.image2 && (
          <div className="flex justify-center">
            <img
              src={product.image2}
              alt="Second view"
              loading="lazy"
              className="w-80 h-80 object-contain rounded-lg border shadow-sm"
            />
          </div>
        )}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="bg-gray-900 p-10 rounded-2xl text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="text-2xl font-semibold text-white mb-6">
          Your Partner for Quality Sealing Solutions
        </p>
        <button className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition">
          💬 Ask the Experts
        </button>
      </motion.div>

      {/* Other Products */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Other Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {otherProducts.map((item, index) => (
            <motion.div
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="relative bg-white rounded-xl border shadow-sm hover:shadow-md transition duration-300 cursor-pointer overflow-hidden group"
              whileHover={{ y: -4 }}
            >
              <div className="bg-gray-50 p-6 flex items-center justify-center h-56">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-medium text-lg group-hover:text-blue-600 transition">
                  {item.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;
