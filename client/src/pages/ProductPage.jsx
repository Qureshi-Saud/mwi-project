import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);

  // Scroll to top when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch product by ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  // Fetch other products (excluding current one)
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

  if (!product) return <div className="p-10 text-center text-gray-500 text-lg">Loading...</div>;

  return (
    <div className="bg-white min-h-screen px-4 md:px-8 py-10 max-w-7xl mx-auto">
      {/* Title */}
      <div className="mb-12 border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-lg text-gray-600">{product.application}</p>
      </div>

      {/* Image + Operating Limits */}
      <div className="grid lg:grid-cols-2 gap-10 mb-16 bg-gray-100 p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-56 h-56 object-contain rounded-lg drop-shadow-md mb-4"
          />
          <p className="text-sm font-medium text-gray-700 tracking-wide">
            <span className="font-semibold">TYPE:</span> {product.type}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Operating Limits</h2>
          <ul className="space-y-3 text-gray-700 text-[17px]">
            <li><strong>Shaft Dia:</strong> {product.operatingLimits?.shaftDia}</li>
            <li><strong>Pressure:</strong> {product.operatingLimits?.pressure}</li>
            <li><strong>Temperature:</strong> {product.operatingLimits?.temperature}</li>
            <li><strong>Speed:</strong> {product.operatingLimits?.speed}</li>
          </ul>
        </div>
      </div>

      {/* Materials + Image 2 */}
      <div className="grid lg:grid-cols-2 gap-10 mb-16 items-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Material of Construction</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 text-[17px]">
            {product.materials?.sealRingFaces && <li><strong>Seal Ring Faces:</strong> {product.materials.sealRingFaces}</li>}
            {product.materials?.seatFaces && <li><strong>Seat Faces:</strong> {product.materials.seatFaces}</li>}
            {product.materials?.elastomer && <li><strong>Elastomer:</strong> {product.materials.elastomer}</li>}
            {product.materials?.moc && <li><strong>MOC:</strong> {product.materials.moc}</li>}
            {product.materials?.bellowMoc && <li><strong>Bellow MOC:</strong> {product.materials.bellowMoc}</li>}
            {product.materials?.endFittingMoc && <li><strong>End Fitting MOC:</strong> {product.materials.endFittingMoc}</li>}
          </ul>
        </div>

        {product.image2 && (
          <div className="flex justify-center">
            <img
              src={product.image2}
              alt="Second view"
              className="w-80 h-80 object-contain rounded-xl shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-8 rounded-2xl shadow-md mb-16 text-center">
        <p className="text-xl font-semibold text-blue-900 mb-4">
          Your Partner for Quality Sealing Solutions.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-base font-medium shadow-md transition-all">
          ASK THE EXPERTS
        </button>
      </div>

      {/* Other Products */}
<div className="mb-10">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Other Products</h2>

  {otherProducts.length === 0 ? (
    <p className="text-gray-500">No other products available.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {otherProducts.map((item) => (
        <div
          key={item._id}
          onClick={() => navigate(`/product/${item._id}`)}
          className="bg-white rounded-xl shadow-sm border hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden group"
        >
          <div className="bg-gray-100 p-6 flex items-center justify-center h-56">
            <img
              src={item.image}
              alt={item.name}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4 text-center">
            <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
              {item.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default ProductPage;
