import ChatList from "../../components/chatList/ChatList";
import Chat from "../../components/chat/Chat";
import "./Home.css";
import { ChatProvider } from "../../Hooks/ChatContext";

export default function Home() {

  return (
    <div className="homePage">
      <div className="searchChat">
        <input type="text" placeholder="Search..."/>
      </div>
      <h1>CHATS</h1>
      <ChatProvider>
        <ChatList />
        <Chat />
      </ChatProvider>

    </div>
  );
}
