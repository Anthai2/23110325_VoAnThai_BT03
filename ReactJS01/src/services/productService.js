import axios from "../util/axios.customize";

const API_URL = "/v1/api/products";

export const getProducts = async (params = {}) => {
  const res = await axios.get(API_URL, { params });
  return res;
};

export const getProductById = async (id) => {
  if (!id) return null;
  const res = await axios.get(`${API_URL}/${id}`);
  return res;
};

// Lấy danh sách categories
export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`);
  return res;
};

// Lấy sản phẩm theo category với phân trang
export const getProductsByCategory = async (category, params = {}) => {
  const res = await axios.get(`${API_URL}/category/${category}`, { params });
  return res;
};

// Lấy top 10 sản phẩm bán chạy nhất
export const getBestSellers = async (params = {}) => {
  const res = await axios.get(`${API_URL}/best-sellers`, { params });
  return res;
};

// Lấy top 10 sản phẩm xem nhiều nhất
export const getMostViewed = async (params = {}) => {
  const res = await axios.get(`${API_URL}/most-viewed`, { params });
  return res;
};
// Tìm kiếm sản phẩm
export const searchProducts = async (params = {}) => {
  const res = await axios.get(API_URL, { params });
  return res;
};
