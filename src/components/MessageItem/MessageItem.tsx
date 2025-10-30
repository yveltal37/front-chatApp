import "./MessageItem.css";
import type { Message } from "../../services/messages-service";
import { useContext } from "react";
import { LoggedInContext } from "../../Hooks/IsLogin";

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const { user } = useContext(LoggedInContext);
  const isMine = message.sender.id === user.id;

  return (
    <div 
      key={message.id} 
      className={`message ${isMine ? 'my-message' : 'other-message'}`}
    >
      <strong>{isMine ? 'you' : message.sender.username}:</strong>
      <span>{message.content}</span>
    </div>
  )
}
