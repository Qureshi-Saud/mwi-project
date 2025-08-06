import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
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
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="px-6 py-10 text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Product Title */}
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        {/* Image and Description */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[350px] object-contain border rounded-lg cursor-pointer"
            onClick={() => openModal(product.image)}
          />
          <div>
            {product.shortDescription && (
              <p className="text-lg text-gray-700">{product.shortDescription}</p>
            )}
          </div>
        </div>

        {/* Materials */}
        {product.materials && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Materials</h2>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              {product.materials.sealRingFaces && <li><strong>Seal Ring Faces:</strong> {product.materials.sealRingFaces}</li>}
              {product.materials.seatFaces && <li><strong>Seat Faces:</strong> {product.materials.seatFaces}</li>}
              {product.materials.elastomer && <li><strong>Elastomer:</strong> {product.materials.elastomer}</li>}
              {product.materials.moc && <li><strong>MOC:</strong> {product.materials.moc}</li>}
              {product.materials.bellowMoc && <li><strong>Bellow MOC:</strong> {product.materials.bellowMoc}</li>}
              {product.materials.endFittingMoc && <li><strong>End Fitting MOC:</strong> {product.materials.endFittingMoc}</li>}
            </ul>
          </div>
        )}

        {/* Operating Limits */}
        {product.operatingLimits && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Operating Limits</h2>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              {product.operatingLimits.shaftDia && <li><strong>Shaft Dia.:</strong> {product.operatingLimits.shaftDia}</li>}
              {product.operatingLimits.pressure && <li><strong>Pressure:</strong> {product.operatingLimits.pressure}</li>}
              {product.operatingLimits.temperature && <li><strong>Temperature:</strong> {product.operatingLimits.temperature}</li>}
              {product.operatingLimits.speed && <li><strong>Speed:</strong> {product.operatingLimits.speed}</li>}
            </ul>
          </div>
        )}

        {/* Additional Image */}
        {product.image2 && (
          <div className="mb-10">
            <img
              src={product.image2}
              alt={`${product.name} - View 2`}
              className="w-full h-[300px] object-contain border rounded-lg cursor-pointer"
              onClick={() => openModal(product.image2)}
            />
          </div>
        )}

        {/* Application */}
        {product.application && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-2">Application</h2>
            <p className="text-gray-700">{product.application}</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              className="absolute top-2 right-2 text-white text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Zoomed"
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
