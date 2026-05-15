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
