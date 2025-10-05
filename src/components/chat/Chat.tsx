import "./Chat.css";
import { ChatContext } from "../../Hooks/ChatContext";
import { useContext, useState } from "react";
import { addUser } from "../../services/chats-service";


function Chat() {
  const { connectedChat, setConnectedChat } = useContext(ChatContext);
  const [userToAdd, setUserToAdd] = useState(''); 
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const handleCloseChat = () => {
    setConnectedChat(null); 
  };

  const handleAddUserSubmit = async () => {
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
                        placeholder="שם משתמש להוספה"
                        value={userToAdd}
                        onChange={(e) => setUserToAdd(e.target.value)}
                    />
                    <button 
                        onClick={handleAddUserSubmit} 
                    >
                    </button>
                </div>
            )}
    </div>
  );
}

export default Chat;