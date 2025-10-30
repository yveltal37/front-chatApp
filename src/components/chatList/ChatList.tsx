import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../../Hooks/IsLogin";
import {  getChatsForUser, createChat  } from "../../services/chats-service";
import type { Chat } from "../../services/chats-service";
import "./ChatList.css";
import { ChatContext } from "../../Hooks/ChatContext";
import ChatItem from "../ChatItem/ChatItem";
import CreateChatForm from "../CreateChatForm/CreateChatForm";

function ChatList() {
  const { user, isLoggedIn } = useContext(LoggedInContext);
  const { setConnectedChat } = useContext(ChatContext);
  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = async () => {
    try {
      const res = await getChatsForUser();
      setChats(res || []);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    if(isLoggedIn){
      fetchChats();
    }
  }, [user]);

  const handleCreateChat = async (chatName: string, isGroupChat: boolean) => {
    await createChat(chatName, isGroupChat);
    await fetchChats();
  };

  const handleChatClick = (chat: { id: number; name: string }) => {
    setConnectedChat(chat);
  };

  const handleLeaveChat = (chatId: number) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
  };

  return (

    <div className="chatList">
      <CreateChatForm onCreate={handleCreateChat} />

      <div className="chat-list-items">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} onClick={handleChatClick} onLeave={handleLeaveChat} />
          ))
        ) : (
          <p>No chats found</p>
        )}
      </div>
    </div>
  );
}

export default ChatList;
