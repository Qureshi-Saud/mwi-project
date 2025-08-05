import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaWhatsapp, FaCogs, FaBolt, FaThermometerHalf, FaTachometerAlt, FaCircle, FaTools, FaCubes, FaCompressArrowsAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        <p className="text-xl font-semibold text-slate-500 animate-pulse">Loading...</p>
      </div>
    );

  const whatsappNumber = "917715068534";
  const encodedMessage = encodeURIComponent(
    `Hello, I'm interested in the product: ${product.name}. Could you provide more details?\n${product.image}`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <div className="bg-gradient-to-br from-white via-slate-100 to-slate-200 font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-950 text-white py-20 px-4 text-center">
        <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
          Our Products
        </h2>
        <p className="text-lg text-blue-200 mt-4">Explore specs, materials, and performance.</p>
      </section>

      {/* Product Content */}
      <div className="max-w-6xl mx-auto px-4 py-20 space-y-20">
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">{product.name}</h1>
          {product.shortDescription && (
            <p className="text-lg text-slate-700">{product.shortDescription}</p>
          )}
        </div>

        {/* Row 1: Main Image + Materials */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-contain rounded-xl cursor-zoom-in transition-transform duration-300 hover:scale-105"
              onClick={() => openModal(product.image)}
            />
          </div>

          {/* Materials */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-900 border-b pb-2">🔩 Materials</h3>
            <ul className="text-base text-slate-700 space-y-2 leading-relaxed">
              {product.materials?.sealRingFaces && (
                <li className="flex items-center gap-2">
                  <FaCircle className="text-blue-700" />
                  <strong>Seal Ring Faces:</strong> {product.materials.sealRingFaces}
                </li>
              )}
              {product.materials?.seatFaces && (
                <li className="flex items-center gap-2">
                  <FaTools className="text-blue-700" />
                  <strong>Seat Faces:</strong> {product.materials.seatFaces}
                </li>
              )}
              {product.materials?.elastomer && (
                <li className="flex items-center gap-2">
                  <FaCogs className="text-blue-700" />
                  <strong>Elastomer:</strong> {product.materials.elastomer}
                </li>
              )}
              {product.materials?.moc && (
                <li className="flex items-center gap-2">
                  <FaCubes className="text-blue-700" />
                  <strong>MOC:</strong> {product.materials.moc}
                </li>
              )}
              {product.materials?.bellowMoc && (
                <li className="flex items-center gap-2">
                  <FaCompressArrowsAlt className="text-blue-700" />
                  <strong>Bellow MOC:</strong> {product.materials.bellowMoc}
                </li>
              )}
              {product.materials?.endFittingMoc && (
                <li className="flex items-center gap-2">
                  <FaTools className="text-blue-700" />
                  <strong>End Fitting MOC:</strong> {product.materials.endFittingMoc}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Row 2: Limits + Image 2 */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Limits */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-900 border-b pb-2">⚙️ Operating Limits</h3>
            <ul className="text-base text-slate-700 space-y-2 leading-relaxed">
              {product.operatingLimits?.shaftDia && (
                <li className="flex items-center gap-2">
                  <FaCircle className="text-blue-700" />
                  <strong>Shaft Dia.:</strong> {product.operatingLimits.shaftDia}
                </li>
              )}
              {product.operatingLimits?.pressure && (
                <li className="flex items-center gap-2">
                  <FaBolt className="text-blue-700" />
                  <strong>Pressure:</strong> {product.operatingLimits.pressure}
                </li>
              )}
              {product.operatingLimits?.temperature && (
                <li className="flex items-center gap-2">
                  <FaThermometerHalf className="text-blue-700" />
                  <strong>Temperature:</strong> {product.operatingLimits.temperature}
                </li>
              )}
              {product.operatingLimits?.speed && (
                <li className="flex items-center gap-2">
                  <FaTachometerAlt className="text-blue-700" />
                  <strong>Speed:</strong> {product.operatingLimits.speed}
                </li>
              )}
            </ul>
          </div>

          {/* Image 2 */}
          {product.image2 && (
            <div className="w-full">
              <img
                src={product.image2}
                alt={`${product.name} - Additional`}
                className="w-full h-[400px] object-contain rounded-xl cursor-zoom-in transition-transform duration-300 hover:scale-105"
                onClick={() => openModal(product.image2)}
              />
            </div>
          )}
        </div>

        {/* Application */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-blue-900 border-b pb-2">📦 Application</h3>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed tracking-wide">
            {product.application}
          </p>
        </div>

        {/* WhatsApp Button */}
        <div className="flex justify-center pt-10">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-tr from-green-500 to-green-600 text-white text-lg font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <FaWhatsapp className="text-2xl" />
            Contact via WhatsApp
          </a>
        </div>
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition-colors"
              onClick={closeModal}
            >
              <IoClose />
            </button>
            <img
              src={modalImage}
              alt="Enlarged"
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
