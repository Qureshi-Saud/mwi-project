import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover rounded-lg shadow-md"
        />
      )}

      <div className="space-y-2">
        <p><strong>Materials:</strong> {product.materials}</p>
        <p><strong>Operating Limits:</strong> {product.operatingLimits}</p>
        <p><strong>Application:</strong> {product.application}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
