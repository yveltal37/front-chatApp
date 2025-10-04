import "./ChatList.css";

const chats = [
  { id: 1, name: "yosi" },
  { id: 2, name: "david" },
  { id: 3, name: "shlomo" },
];

export default function ChatList() {
  return (
    <div className="chatList">
      <h2>CHATS</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>{chat.name}</li>
        ))}
      </ul>
    </div>
  );
}
