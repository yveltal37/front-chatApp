import axios from "axios";

export interface Message {
  id: number;
  content: string;
  sender: { id: number; username: string };
}

const API_URL = "http://localhost:3000/message";

const api = axios.create();
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        sessionStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`http://localhost:3000/authentication/refresh`, { refreshToken });
        const newAccessToken = res.data.tokens.accessToken;
        sessionStorage.setItem("accessToken", newAccessToken);

        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch {
        sessionStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const getChatHistory = async (chatId: number) => {
  const token = sessionStorage.getItem("accessToken");
  return (
    await api.get<Message[]>(`${API_URL}/history/${chatId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  ).data;
};

export const sendMessage = async (chatId: number, data: { senderId: number; content: string }) => {
  const token = sessionStorage.getItem("accessToken");
  return (
    await api.post(`${API_URL}/${chatId}`, data, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
  ).data;
};