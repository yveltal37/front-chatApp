import axios from "axios";

export interface Chat {
  id: number;
  name: string;
  isGroup: boolean;
}

const API_URL = "http://localhost:3000/chats";

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

export const getChatsForUser = async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) return;
  const res = await api.get<Chat[]>(`${API_URL}/my-chats`, 
    {headers: { Authorization: `Bearer ${accessToken}` }}
  );
  return res.data;
};

export const createChat = async (name: string, isGroup: boolean ) => {
  const accessToken = sessionStorage.getItem("accessToken");
  return api.post(API_URL, { name, isGroup }, 
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const addUser = async (chatId: number, username: string) => {
  const accessToken = sessionStorage.getItem("accessToken");
  return api.patch(`${API_URL}/${chatId}/user`,
    { username },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const leaveChat = async (chatId: number) => {
  const accessToken = sessionStorage.getItem("accessToken");
  return await api.delete(`${API_URL}/${chatId}/leave`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

};

