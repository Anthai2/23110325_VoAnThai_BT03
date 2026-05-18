import { useEffect, useState } from "react";
import { getCategories } from "../../services/productService";

const ProductFilter = ({
  selectedCategory,
  onCategoryChange,
  onSortChange,
  loading,
  disabled = false,
}) => {
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoryLoading(true);
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Danh mục</h3>

        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left py-2 px-3 rounded-lg mb-2 transition-colors ${
            selectedCategory === null
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Tất cả sản phẩm
        </button>

        {categoryLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 h-8 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onCategoryChange(cat.name)}
                className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                  selectedCategory === cat.name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort Options */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sắp xếp</h3>
        <select
          onChange={(e) => onSortChange && onSortChange(e)}
          defaultValue="newest"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Mới nhất</option>
          <option value="bestseller">Bán chạy nhất</option>
          <option value="most-viewed">Xem nhiều nhất</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
