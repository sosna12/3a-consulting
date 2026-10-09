// ================================================
//  Axios Instance — 3A Consulting
//  Automatically uses localhost in dev,
//  Render URL in production
// ================================================

import axios from "axios";

// ✅ Dynamic base URL:
//    In dev  → http://localhost:5000/api
//    In prod → https://3a-consulting-backend.onrender.com/api
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------- Request Interceptor — attach JWT ----------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------- Response Interceptor — handle 401 ----------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default api;