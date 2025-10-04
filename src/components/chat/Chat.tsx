import "./Chat.css";
import { ChatContext } from "../../Hooks/ChatContext";
import { useContext } from "react";


function Chat() {
  const { connectedChat } = useContext(ChatContext);
  if(!connectedChat)
    return(null);
  return (
    <div className="side-chat">
      <button className="plus-button">+</button>
    </div>
  );
}

export default Chat;