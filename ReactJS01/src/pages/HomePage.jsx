import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductList from "../components/product/ProductList";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const promotions = products.filter((p) => p.isPromotion);
  const newest = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);
  const bestsellers = [...products]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 8);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Trang chủ - Cửa hàng</h1>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-3">Khuyến mãi</h2>
        <ProductList
          products={promotions}
          loading={loading}
          emptyMessage="Không có chương trình khuyến mãi"
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-3">Mới nhất</h2>
        <ProductList
          products={newest}
          loading={loading}
          emptyMessage="Không có sản phẩm mới"
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-3">Bán chạy</h2>
        <ProductList
          products={bestsellers}
          loading={loading}
          emptyMessage="Không có sản phẩm bán chạy"
        />
      </section>
    </div>
  );
};

export default HomePage;
