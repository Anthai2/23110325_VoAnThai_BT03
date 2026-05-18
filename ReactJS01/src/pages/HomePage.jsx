import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductList from "../components/product/ProductList";
import BestSellersSection from "../components/product/BestSellersSection";
import MostViewedSection from "../components/product/MostViewedSection";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getProducts({ limit: 20 });
        setProducts(data?.products || data || []);
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to Our Store 🛍️
        </h1>

        {/* Promotions Section */}
        {promotions.length > 0 && (
          <section className="mb-12 bg-red-50 rounded-lg p-6 border-2 border-red-200">
            <h2 className="text-2xl font-semibold mb-4">
              🎉 Khuyến mãi đặc biệt
            </h2>
            <ProductList
              products={promotions}
              loading={loading}
              emptyMessage="Không có chương trình khuyến mãi"
            />
          </section>
        )}

        {/* Best Sellers Section - Horizontal Scroll */}
        <BestSellersSection />

        {/* Most Viewed Section - Horizontal Scroll */}
        <MostViewedSection />

        {/* Newest Section */}
        {newest.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              ✨ Sản phẩm mới nhất
            </h2>
            <ProductList
              products={newest}
              loading={loading}
              emptyMessage="Không có sản phẩm mới"
            />
          </section>
        )}

        {/* CTA Button */}
        <section className="text-center py-8 bg-blue-500 rounded-lg text-white mt-12">
          <h3 className="text-2xl font-semibold mb-4">
            Khám phá tất cả sản phẩm
          </h3>
          <a
            href="/products"
            className="inline-block px-8 py-3 bg-white text-blue-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Xem thêm →
          </a>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
