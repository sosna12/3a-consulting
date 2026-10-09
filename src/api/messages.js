// ================================================
//  Messages API helper
// ================================================

import api from "./axios";

// PUBLIC
export const submitMessage = async (messageData) => {
  const { data } = await api.post("/messages", messageData);
  return data;
};

// ADMIN
export const fetchMessages = async (params = {}) => {
  const { data } = await api.get("/messages", { params });
  return data;
};

export const fetchMessageStats = async () => {
  const { data } = await api.get("/messages/stats");
  return data;
};

export const fetchMessageById = async (id) => {
  const { data } = await api.get(`/messages/${id}`);
  return data;
};

export const updateMessage = async (id, updates) => {
  const { data } = await api.put(`/messages/${id}`, updates);
  return data;
};

export const deleteMessage = async (id) => {
  const { data } = await api.delete(`/messages/${id}`);
  return data;
};