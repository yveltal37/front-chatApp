// message.service.ts

import axios from "axios";

// הגדרת הממשק של ההודעה שאתה מצפה לקבל
export interface Message {
  id: number;
  content: string;
  createdAt: Date;
  sender: { id: number; username: string }; // לפי ה-relations ב-Backend
}

const API_URL = "http://localhost:3000/messages"; // 👈🏼 נקודת הקצה הנכונה

export const getChatHistory = async (chatId: number) => {
  return axios.get<Message[]>(`${API_URL}/history/${chatId}`);
};

export const sendMessage = async (chatId: number, data: {senderId: number, content: string}) => {
  return axios.post<Message>(`${API_URL}/${chatId}`, data);
};