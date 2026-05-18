import { useEffect, useState } from "react";
import {
  getProductsByCategory,
  getProducts,
  getCategories,
  searchProducts,
} from "../services/productService";
import ProductList from "../components/product/ProductList";
import ProductFilter from "../components/product/ProductFilter";
import ProductSkeletonLoader from "../components/product/ProductSkeletonLoader";

const ITEMS_PER_PAGE = 12;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("newest");
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        const params = {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          sort: sort,
        };

        if (searchQuery) {
          // Tìm kiếm với query
          data = await searchProducts({ ...params, q: searchQuery });
        } else if (selectedCategory) {
          data = await getProductsByCategory(selectedCategory, params);
        } else {
          data = await getProducts(params);
        }

        setProducts(data?.products || data || []);
        setTotalPages(data?.pages || 1);
        setTotalProducts(data?.total || 0);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, currentPage, sort, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-2">
          {searchQuery
            ? `Kết quả tìm kiếm: "${searchQuery}"`
            : selectedCategory
              ? `Danh mục: ${selectedCategory}`
              : "Tất cả sản phẩm"}
        </h1>
        <p className="text-gray-600 mb-6">
          Có{" "}
          <span className="font-semibold text-blue-600">{totalProducts}</span>{" "}
          sản phẩm
        </p>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Filter */}
          <div className="lg:col-span-1">
            <ProductFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onSortChange={handleSortChange}
              loading={loading}
              disabled={searchQuery.length > 0}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-4">
            {loading ? (
              <ProductSkeletonLoader count={ITEMS_PER_PAGE} />
            ) : products.length > 0 ? (
              <>
                <ProductList products={products} loading={false} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      ← Trước
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-1">
                      {Array.from(
                        { length: Math.min(totalPages, 7) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 7) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 6 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                                currentPage === pageNum
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        },
                      )}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      Tiếp →
                    </button>
                  </div>
                )}

                <p className="text-center mt-4 text-gray-600">
                  Trang <span className="font-semibold">{currentPage}</span> /{" "}
                  {totalPages}
                </p>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">Không tìm thấy sản phẩm</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
