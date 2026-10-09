// ================================================
//  Projects API helper
// ================================================

import api from "./axios";

export const fetchProjects = async (params = {}) => {
  const { data } = await api.get("/projects", { params });
  return data;
};

export const fetchProjectById = async (id) => {
  const { data } = await api.get(`/projects/${id}`);
  return data;
};

export const createProject = async (projectData) => {
  const { data } = await api.post("/projects", projectData);
  return data;
};

export const updateProject = async (id, projectData) => {
  const { data } = await api.put(`/projects/${id}`, projectData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};