import React from "react";
import type { Chat } from "../../services/chats-service";
import { leaveChat } from "../../services/chats-service";
import "./ChatItem.css";
import rubbish from "../../assets/rubbish.png"

interface ChatItemProps {
  chat: Chat;
  onClick?: (chat: Chat) => void;
  onLeave?: (chatId: number) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onClick, onLeave }) => {
    const handleLeave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to leave "${chat.name}"?`)) return;

    try {
      await leaveChat(chat.id);
      alert(`You left "${chat.name}"`);
      onLeave?.(chat.id);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to leave chat");
    } finally {
    }
  };
  return (
    <div className="chat-item" onClick={() => onClick?.(chat)}>
      <span className="chat-item-type">{chat.isGroup ? "Group: " : "Private: "}</span>
      <h3 className="chat-item-chatname">{chat.name}</h3>
        <button
          className="chat-leave-button"
          onClick={handleLeave}
        >
          {<img className="rubbish" src={rubbish}/>}
        </button>
    </div>
  );
};

export default ChatItem;
