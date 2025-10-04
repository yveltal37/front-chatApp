import ChatList from "../../components/chatList/ChatList";
import "./Home.css";

export default function Home() {

  return (
    <div className="homePage">
      <div className="searchChat">
        <input type="text" placeholder="Search..."/>
      </div>
      <ChatList />
    </div>
  );
}
