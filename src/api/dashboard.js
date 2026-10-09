// ================================================
//  Dashboard API helper
// ================================================

import api from "./axios";

export const fetchDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data;
};