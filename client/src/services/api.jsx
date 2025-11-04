import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const fetchRecords = (params) =>
  axios.get(`${API_BASE}/records`, { params });
export const createRecord = (data) => axios.post(`${API_BASE}/records`, data);
export const updateRecord = (id, data) =>
  axios.put(`${API_BASE}/records/${id}`, data);
export const deleteRecord = (id) => axios.delete(`${API_BASE}/records/${id}`);
