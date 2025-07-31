import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-950 text-white py-20 text-center shadow-md">
        <h2 className="text-5xl font-extrabold mb-3 tracking-tight">Our Products</h2>
        <p className="text-lg text-blue-200">Explore the specs, limits, and power of our solutions.</p>
      </section>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white mt-[-50px] rounded-xl shadow-lg relative z-10">
        {/* Text Content */}
        <div>
          <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
            TYPE {product.type}
          </span>

          <h3 className="text-4xl font-bold text-gray-800 mb-6">{product.name}</h3>

          <div className="space-y-6 text-gray-700">
            <div>
              <h4 className="font-semibold text-xl flex items-center gap-2">🔩 Materials</h4>
              <p className="mt-1 text-gray-600">{product.materials}</p>
            </div>

            <div>
              <h4 className="font-semibold text-xl flex items-center gap-2">⚙️ Operating Limits</h4>
              <p className="mt-1 text-gray-600">{product.operatingLimits}</p>
            </div>

            <div>
              <h4 className="font-semibold text-xl flex items-center gap-2">📦 Application</h4>
              <p className="mt-1 text-gray-600">{product.application}</p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500 max-h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
