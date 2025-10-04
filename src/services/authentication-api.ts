import axios from 'axios';

const API_URL = "http://localhost:3000/authentication";

export const signup = async (data: { username: string; email: string; password: string }) => {
  return axios.post(`${API_URL}/signup`, data);
};

export const login = async (data: { username: string; password: string }) => {
  return axios.post(`${API_URL}/login`, data);
};
