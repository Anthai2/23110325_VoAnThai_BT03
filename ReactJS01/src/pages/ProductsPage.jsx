import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductList from "../components/product/ProductList";

const DEFAULT_LIMIT = 8;

const buildFiltersFromSearchParams = (searchParams) => {
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || DEFAULT_LIMIT);

  return {
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "",
    page: Number.isNaN(page) || page < 1 ? 1 : page,
    limit: Number.isNaN(limit) || limit < 1 ? DEFAULT_LIMIT : limit,
  };
};

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(() =>
    buildFiltersFromSearchParams(searchParams),
  );

  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    const nextParams = {};

    if (filters.q.trim()) nextParams.q = filters.q.trim();
    if (filters.category) nextParams.category = filters.category;
    if (filters.minPrice !== "") nextParams.minPrice = String(filters.minPrice);
    if (filters.maxPrice !== "") nextParams.maxPrice = String(filters.maxPrice);
    if (filters.sort) nextParams.sort = filters.sort;
    if (filters.page !== 1) nextParams.page = String(filters.page);
    if (filters.limit !== DEFAULT_LIMIT)
      nextParams.limit = String(filters.limit);

    setSearchParams(nextParams, { replace: true });
  }, [filters, setSearchParams]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {
          page: filters.page,
          limit: filters.limit,
        };
        if (filters.q.trim()) params.q = filters.q.trim();
        if (filters.category) params.category = filters.category;
        if (filters.minPrice !== "") params.minPrice = Number(filters.minPrice);
        if (filters.maxPrice !== "") params.maxPrice = Number(filters.maxPrice);
        if (filters.sort) params.sort = filters.sort;

        const data = await getProducts(params);
        setProducts(data || []);
        setHasNext((data || []).length === Number(filters.limit));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [filters]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getProducts({ page: 1, limit: 200 });
        const unique = Array.from(
          new Set((data || []).map((item) => item.category).filter(Boolean)),
        );
        setCategories(unique);
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleReset = () => {
    setFilters({
      q: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
      page: 1,
      limit: DEFAULT_LIMIT,
    });
  };

  const goPrevPage = () => {
    setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }));
  };

  const goNextPage = () => {
    if (!hasNext) return;
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Sản phẩm</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mb-6 p-4 border rounded-md bg-white">
        <input
          value={filters.q}
          onChange={(e) => handleFilterChange("q", e.target.value)}
          placeholder="Tìm theo tên/mô tả"
          className="border rounded px-3 py-2 lg:col-span-2"
        />

        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={0}
          value={filters.minPrice}
          onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          placeholder="Giá từ"
          className="border rounded px-3 py-2"
        />

        <input
          type="number"
          min={0}
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          placeholder="Giá đến"
          className="border rounded px-3 py-2"
        />

        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Sắp xếp mặc định</option>
          <option value="newest">Mới nhất</option>
          <option value="bestseller">Bán chạy</option>
        </select>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">Trang {filters.page}</p>
        <button
          onClick={handleReset}
          className="px-3 py-2 border rounded text-sm"
        >
          Xóa bộ lọc
        </button>
      </div>

      <ProductList products={products} loading={loading} />

      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={goPrevPage}
          disabled={filters.page <= 1 || loading}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Trang trước
        </button>
        <button
          onClick={goNextPage}
          disabled={!hasNext || loading}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
