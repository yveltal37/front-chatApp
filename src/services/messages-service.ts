import axios from "axios";

export interface Message {
  id: number;
  content: string;
  sender: { id: number; username: string };
}

const API_URL = "http://localhost:3000/message";

export const getChatHistory = async (chatId: number) => {
  return axios.get(`${API_URL}/history/${chatId}`);
};

export const sendMessage = async (chatId: number, data: {senderId: number, content: string}) => {
  return (await axios.post(`${API_URL}/${chatId}`, data));
};