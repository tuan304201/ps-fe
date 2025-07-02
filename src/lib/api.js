import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Tự động gắn accessToken nếu có (lưu ở localStorage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xử lý lỗi tập trung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        const msg = (error.response.data?.message || "").toLowerCase();
        if (!msg.includes("kích hoạt") && !msg.includes("xác thực") && !msg.includes("otp")) {
          alert("Bạn không có quyền truy cập chức năng này!");
        }
      } else if (error.response.status >= 500) {
        alert("Lỗi server, vui lòng thử lại sau!");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
