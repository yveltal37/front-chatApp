import "./Chat.css";
import { ChatContext } from "../../Hooks/ChatContext";
import { useContext, useState } from "react";
import { addUser } from "../../services/chats-service";
import ChatMessages from "../ChatMessages/ChatMessages";
function Chat() {
  const { connectedChat, setConnectedChat } = useContext(ChatContext);
  const [userToAdd, setUserToAdd] = useState(''); 
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const handleCloseChat = () => {
    setConnectedChat(null); 
  };

  const handleAddUser = async () => {
    if (!userToAdd.trim()) {
      alert("enter user name to add.");
      return;
    }
        
    try {
      await addUser(connectedChat.id, userToAdd); 
      alert(` ${userToAdd} is added!`);
      setUserToAdd(''); 
      setShowAddUserForm(false);
    } catch (error) {
      alert("error");
    }
  };

  if(!connectedChat)
    return(null);
  return (
    <div className="chat">
      <header>
      <button className="close-button" onClick={handleCloseChat}>X</button>
      <button 
        className="add-button" 
        onClick={() => setShowAddUserForm(!showAddUserForm)} >
        {showAddUserForm ? '-' : '+'}
      </button>
      {showAddUserForm && (
        <div className="add-user-form">
          <input 
            type="text"
            placeholder="enter username"
            value={userToAdd}
            onChange={(e) => setUserToAdd(e.target.value)}
          />
          <button onClick={handleAddUser} >+</button>
        </div>
      )}
      </header>
      <ChatMessages />
    </div>
  );
}

export default Chat;