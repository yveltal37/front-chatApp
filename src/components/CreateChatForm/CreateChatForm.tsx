import { useState } from "react";
import "./CreateChatForm.css";

interface CreateChatFormProps {
  onCreate: (chatName: string, isGroupChat: boolean) => Promise<void>;
}

export default function CreateChatForm({ onCreate }: CreateChatFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [chatName, setChatName] = useState("");
  const [isGroup, setIsGroup] = useState(true);

  const handleCreate = async () => {
    if (!chatName.trim()) return alert("Please enter a Chat name");

    try {
      await onCreate(chatName, isGroup);
      setChatName("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className="create-chat-container">
      <div className="create-chat-buttons">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsGroup(true);
          }}
        >
          Create Group
        </button>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsGroup(false);
          }}
        >
          Create Private Chat
        </button>
    </div>

      {showForm && (
        <div className="create-chat-form">
          <input
            type="text"
            placeholder="Chat Name"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />
          <button onClick={handleCreate}>Create</button>
        </div>
      )}
    </div>
  );
}
