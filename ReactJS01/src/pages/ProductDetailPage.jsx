import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, getProducts } from "../services/productService";
import ProductSwiper from "../components/product/ProductSwiper";
import ProductList from "../components/product/ProductList";
import QuantityButton from "../components/product/QuantityButton";
import { CartContext } from "../context/cart.context.jsx";
import { notification } from "antd";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const p = await getProductById(id);
        setProduct(p);
        if (p && p.category) {
          const sims = await getProducts({ category: p.category, limit: 8 });
          setSimilar(sims.filter((s) => s.id !== p.id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading || !product) return <div className="p-6">Đang tải...</div>;

  const increase = () => setQty((q) => Math.min(q + 1, product.stock || 9999));
  const decrease = () => setQty((q) => Math.max(1, q - 1));

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if ((product.stock || 0) < qty) {
      notification.error({
        message: "Lỗi",
        description: "Số lượng vượt quá tồn kho",
      });
      return;
    }
    addToCart(product, qty);
    notification.success({
      message: "Đã thêm vào giỏ",
      description: `${product.name} x ${qty}`,
    });
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <ProductSwiper
          images={
            product.images && product.images.length
              ? product.images
              : [product.image]
          }
        />
        <h1 className="text-2xl font-semibold mt-4">{product.name}</h1>
        <div className="text-gray-600 mt-2">{product.description}</div>
      </div>

      <aside className="p-4 border rounded-md">
        <div className="text-2xl font-bold mb-2">
          {Number(product.price).toLocaleString()} đ
        </div>
        <div className="mb-2">
          Tồn kho: <strong>{product.stock}</strong>
        </div>
        <div className="mb-4">
          Đã bán: <strong>{product.sold || 0}</strong>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <QuantityButton
            value={qty}
            setValue={setQty}
            min={1}
            max={product.stock || 9999}
          />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
        >
          Thêm vào giỏ
        </button>
      </aside>

      <section className="md:col-span-3 mt-6">
        <h2 className="text-xl font-medium mb-3">Sản phẩm tương tự</h2>
        <ProductList
          products={similar}
          emptyMessage="Không có sản phẩm tương tự"
        />
      </section>
    </div>
  );
};

export default ProductDetailPage;
