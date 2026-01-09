import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/employees';

export const getEmployees = () => {
  return axios.get(API_BASE_URL);
}

export const addEmployee = (employee) => {
  return axios.post(API_BASE_URL, employee);
}

export const getEmployeeById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
}

export const deleteEmployee = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
}

export const updateEmployee = (id, employee) => {
  return axios.put(`${API_BASE_URL}/${id}`, employee);
}