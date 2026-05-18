import { useEffect, useState } from "react";
import { getBestSellers } from "../../services/productService";
import ProductCard from "./ProductCard";

const BestSellersSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBestSellers({ limit: 10 });
        setProducts(data?.products || []);
      } catch (err) {
        console.error("Error fetching best sellers:", err);
        setError("Không thể tải sản phẩm bán chạy");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (error) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          🔥 Sản phẩm bán chạy nhất
        </h2>
        <p className="text-red-500 text-center py-8">{error}</p>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">🔥 Sản phẩm bán chạy nhất</h2>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-3 shadow-sm animate-pulse"
            >
              <div className="bg-gray-200 h-40 rounded-lg mb-3"></div>
              <div className="bg-gray-200 h-4 rounded mb-2 w-3/4"></div>
              <div className="bg-gray-200 h-3 rounded mb-3 w-1/2"></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 w-max">
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-48">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          Không có sản phẩm bán chạy
        </p>
      )}
    </section>
  );
};

export default BestSellersSection;
