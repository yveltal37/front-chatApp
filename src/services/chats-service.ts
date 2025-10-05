import axios from "axios";

export interface Chat {
  id: number;
  name: string;
  isGroup: boolean;
}

const API_URL = "http://localhost:3000/chats";

export const getChatsForUser = async (userId: number) => {
  return axios.get(`${API_URL}/${userId}`);
};

export const createChat = async (data: {
  name: string;
  userId: number;
  isGroup?: boolean;
}) => {
  return axios.post(API_URL, data);
};

export const addUser = async (chatId: number, username: string) => {
  return axios.patch(`${API_URL}/${chatId}/user`, { username });
};
