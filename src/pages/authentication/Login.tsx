import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../../Hooks/IsLogin";
import './Auth.css';
import { login } from "../../services/authentication-api";

export default function Login() {
  const { setIsLoggedIn, setUser } = useContext(LoggedInContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      console.log("Logged in:", res);
      sessionStorage.setItem("accessToken", res.tokens.accessToken);
      sessionStorage.setItem("refreshToken", res.tokens.refreshToken);
      setIsLoggedIn(true);
      setUser({ id: res.user.id, name: res.user.username });
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="authPage">
      <h1 className="authTitle">Login</h1>
      <div className="authCard">
        <form onSubmit={handleSubmit}>
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
