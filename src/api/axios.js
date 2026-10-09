// ================================================
//  Axios Instance — 3A Consulting
//  Central HTTP client for all API requests
// ================================================

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",   // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ================================================
//  Request Interceptor — auto-attach JWT token
//  Runs before every request
// ================================================
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

// ================================================
//  Response Interceptor — handle 401 (token expired)
// ================================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear it
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optionally redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;