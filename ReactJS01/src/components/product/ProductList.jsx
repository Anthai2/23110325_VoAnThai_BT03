import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({
  products = [],
  loading = false,
  emptyMessage = "Không có sản phẩm",
}) => {
  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-gray-500 py-4">{emptyMessage}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id || p.ID || p.name} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
