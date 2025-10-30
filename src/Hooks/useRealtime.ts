import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message } from '../services/messages-service';

const API_URL = "http://localhost:3000";

interface SendMessagePayload {
    chatId: number;
    senderId: number;
    content: string;
}

interface RealtimeHook {
    realtimeMessages: Message[];
    sendChatMessage: (payload: SendMessagePayload) => void;
    setRealtimeMessages: React.Dispatch<React.SetStateAction<Message[]>>; 
}

export const useRealtimeChat = (chatId: number | null, senderId: number): RealtimeHook => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [realtimeMessages, setRealtimeMessages] = useState<Message[]>([]);
    
    const enabled = (chatId !== null && senderId !== null);

    useEffect(() => {
        if (!enabled) {
           if (socket){
               socket.disconnect();
                setSocket(null);
            }
        return;
        }

        const token = sessionStorage.getItem("accessToken");
        const newSocket = io(API_URL, { auth: { token } });
        setSocket(newSocket);
        newSocket.emit('joinChat', chatId.toString());
        newSocket.on('newMessage', (message: Message) => {
            setRealtimeMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            newSocket.off('newMessage');
            newSocket.disconnect();
            setSocket(null);
            setRealtimeMessages([]);
        };
    }, [chatId, enabled, senderId]);

    const sendChatMessage = (payload: SendMessagePayload) => {
        if (socket && chatId) {
              socket.emit('sendMessage', payload);
        }
    };

    return { 
    realtimeMessages, 
    sendChatMessage,
    setRealtimeMessages 
    };
};