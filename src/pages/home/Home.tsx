import ChatList from "../../components/ChatList/ChatList";
import Chat from "../../components/Chat/Chat";
import "./Home.css";
import { ChatProvider } from "../../Hooks/ChatContext";

export default function Home() {
  return (
    <div className="homePage">
      <h1>CHATS</h1>
      <ChatProvider>
        <ChatList />
        <Chat />
      </ChatProvider>
    </div>
  );
}
