import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const img =
    (product.images && product.images[0]) ||
    product.image ||
    "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="border rounded-md p-3 bg-white shadow-sm">
      <Link to={`/products/${product.id || product.ID || ""}`}>
        <div className="w-full h-40 mb-2 overflow-hidden rounded-md">
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-left">
          <h3 className="font-medium text-sm mb-1 text-gray-800">
            {product.name}
          </h3>
          <div className="text-sm text-gray-600 mb-1">{product.category}</div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-emerald-700">
              {Number(product.price).toLocaleString()} đ
            </div>
            <div className="text-xs text-gray-500">{product.stock} tồn</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
