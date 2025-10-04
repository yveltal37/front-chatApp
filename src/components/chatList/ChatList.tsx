import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../../Hooks/IsLogin";
import {  getChatsForUser, createChat  } from "../../services/chats";
import type { Chat } from "../../services/chats";
import "./ChatList.css";

function ChatList() {
  const { user } = useContext(LoggedInContext);
  const [chats, setChats] = useState<Chat[]>([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");

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

  
  const handleCreateGroup = async () => {
    try {
      if (!groupName.trim()) return alert("Please enter a group name");
      await createChat({ name: groupName, userIds: [user.id], isGroup: true });
      setShowCreateGroup(false);
      setGroupName("");
      const response = await getChatsForUser(user.id);
      setChats(response.data);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };


  return (
    <div className="chatList">
      <button onClick={() => setShowCreateGroup(!showCreateGroup)}>
        Create Group
      </button>

      {showCreateGroup && (
        <div className="create-group-form">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button onClick={handleCreateGroup}>Create</button>
        </div>
      )}

      <ul>
        {chats.length > 0 ? (
          chats.map(chat => (
            <li key={chat.id}>
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
