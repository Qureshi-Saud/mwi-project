import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { motion } from "framer-motion";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
  {/* Full-width Blue Hero Section */}
  <section className="w-full bg-blue-900 text-white text-center py-20 px-6">
    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
      Our Products
    </h1>
    <p className="text-center text-white max-w-2xl mx-auto">
      Discover our high-performance solutions tailored for power, chemical,
      and industrial sectors. Trusted quality. Engineered to last.
    </p>
  </section>

  {/* Padded content container */}
  <div className="bg-white text-gray-800 font-sans py-12 px-4">
    {/* Search Bar */}
    <div className="mb-10 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border shadow focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to={`/product/${product._id}`}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  View Details
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase">
                  Type {product.type}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-2">
                  {product.name}
                </h3>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>

    {/* Empty State */}
    {filteredProducts.length === 0 && (
      <p className="text-center text-gray-500 mt-10">
        No products match your search.
      </p>
    )}
  </div>
</div>

  );
}

export default Products;
