import axios from 'axios';

const API_URL = "http://localhost:3000/authentication";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
  };
  tokens: Tokens;
}

export const signup = async (data: { username: string; email: string; password: string }): Promise<AuthResponse> => {
  return (await axios.post<AuthResponse>(`${API_URL}/signup`, data)).data;
};

export const login = async (data: { username: string; password: string }): Promise<AuthResponse> => {
  return (await axios.post<AuthResponse>(`${API_URL}/login`, data)).data;
}

export const refresh = async (refreshToken: string): Promise<{ tokens: Tokens }> => {
  const res = await axios.post<{ tokens: Tokens }>(`${API_URL}/refresh`, { refreshToken });
  return res.data;
}
