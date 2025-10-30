import "./ChatMessages.css";
import { LoggedInContext } from "../../Hooks/IsLogin";
import { ChatContext } from "../../Hooks/ChatContext";
import { useContext, useState, useEffect, useRef } from "react";
import { getChatHistory } from "../../services/messages-service";
import type { Message } from "../../services/messages-service";
import { useRealtimeChat } from '../../Hooks/UseRealtime'; 
import MessageItem from "../MessageItem/MessageItem";

function ChatMessages() {
  const { connectedChat } = useContext(ChatContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const {user}= useContext(LoggedInContext);
  const [newMessageContent, setNewMessageContent] = useState('');
  const { realtimeMessages, sendChatMessage, setRealtimeMessages } = useRealtimeChat(
    connectedChat.id ,user.id );
  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (realtimeMessages.length === 0) return;

    setMessages(prevMessages => {
      return [...prevMessages, ...realtimeMessages]; 
    });

    setRealtimeMessages([]);
  }, [realtimeMessages, setRealtimeMessages,]);

  const handleSendMessage = () => {
    if (!newMessageContent.trim()) return;

    sendChatMessage({
      chatId: connectedChat.id,
      senderId: user.id,
      content: newMessageContent
    });
    setNewMessageContent('');
  };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await getChatHistory(connectedChat.id);
        setMessages(res);
        
      } catch (error) {
        console.error("Failed to load chat history:", error);
        alert("Failed to load messages.");
      }
    };
    loadHistory();
  }, [connectedChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messages-container">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="message-input-form">
        <input
          type="text"
          placeholder="enter maessage..."
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
               handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage} disabled={!newMessageContent.trim()}>send</button>
      </div>
    </>
  );
}

export default ChatMessages;
