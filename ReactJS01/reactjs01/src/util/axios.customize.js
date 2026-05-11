import axios from "axios";

// Khởi tạo một instance của axios với baseURL lấy từ biến môi trường
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Thêm request interceptor: Can thiệp trước khi gửi API đi
instance.interceptors.request.use(
  function (config) {
    // Tự động đính kèm token vào header Authorization
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Thêm response interceptor: Can thiệp sau khi nhận kết quả từ API
instance.interceptors.response.use(
  function (response) {
    // Nếu API trả về data chuẩn, chỉ lấy phần data cho code gọn
    if (response && response.data) return response.data;
    return response;
  },
  function (error) {
    // Bắt lỗi trả về từ Backend
    if (error?.response?.data) return error?.response?.data;
    return Promise.reject(error);
  },
);

export default instance;
