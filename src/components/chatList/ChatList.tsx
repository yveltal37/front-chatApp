import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../../Hooks/IsLogin";
import {  getChatsForUser, createChat  } from "../../services/chats-service";
import type { Chat } from "../../services/chats-service";
import "./ChatList.css";
import { ChatContext } from "../../Hooks/ChatContext";

function ChatList() {
  const { user } = useContext(LoggedInContext);
  const { setConnectedChat } = useContext(ChatContext);
  const [chats, setChats] = useState<Chat[]>([]);
  const [showCreateChat, setShowCreateChat] = useState(false);
  const [chatName, setChatName] = useState("");
  const [isGroupToCreate, setIsGroupToCreate] = useState<boolean> (true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChatsForUser(user.id);
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, [user]);

  const handleCreateChat = async (isGroupChat:boolean) => {
    try {
      if (!chatName.trim()) return alert("Please enter a Chat name");
      await createChat({ name: chatName, userId: user.id, isGroup: isGroupChat });
      setShowCreateChat(false);
      setChatName("");
      const response = await getChatsForUser(user.id);
      setChats(response.data);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleChatClick = (chat: { id: number; name: string }) => {
    setConnectedChat(chat);
  };

  return (
    <div className="chatList">
      <button onClick={() => {setShowCreateChat(!showCreateChat); setIsGroupToCreate(true)}}>
        Create Group
      </button>
      <button onClick={() => {setShowCreateChat(!showCreateChat); setIsGroupToCreate(false)}}>
        Create Private Chat
      </button>

      {showCreateChat && (
        <div className="create-Chat-form">
          <input
            type="text"
            placeholder="Chat Name"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />
          <button onClick={() => handleCreateChat(isGroupToCreate)}>Create</button> 
        </div>
      )}

      <ul>
        {chats.length > 0 ? (
          chats.map(chat => (
            <li key={chat.id} onClick={() => handleChatClick({id: chat.id, name: chat.name})}>
              {chat.isGroup ? "Group: " : "Private: "} {chat.name}
            </li>
          ))
        ) : (
          <li>No chats found</li>
        )}
      </ul>
    </div>
  );
}

export default ChatList;
