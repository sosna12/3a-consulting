// ================================================
//  News API helper — wraps all news endpoints
// ================================================

import api from "./axios";

export const fetchNews = async (params = {}) => {
  const { data } = await api.get("/news", { params });
  return data;
};

export const fetchNewsById = async (id) => {
  const { data } = await api.get(`/news/${id}`);
  return data;
};

export const createNews = async (newsData) => {
  const { data } = await api.post("/news", newsData);
  return data;
};

export const updateNews = async (id, newsData) => {
  const { data } = await api.put(`/news/${id}`, newsData);
  return data;
};

export const deleteNews = async (id) => {
  const { data } = await api.delete(`/news/${id}`);
  return data;
};