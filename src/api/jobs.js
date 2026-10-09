// ================================================
//  Jobs API helper
// ================================================

import api from "./axios";

export const fetchJobs = async (params = {}) => {
  const { data } = await api.get("/jobs", { params });
  return data;
};

export const fetchJobById = async (id) => {
  const { data } = await api.get(`/jobs/${id}`);
  return data;
};

export const createJob = async (jobData) => {
  const { data } = await api.post("/jobs", jobData);
  return data;
};

export const updateJob = async (id, jobData) => {
  const { data } = await api.put(`/jobs/${id}`, jobData);
  return data;
};

export const deleteJob = async (id) => {
  const { data } = await api.delete(`/jobs/${id}`);
  return data;
};