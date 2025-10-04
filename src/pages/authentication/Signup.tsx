import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../../Hooks/IsLogin";
import './Auth.css';
import { signup } from "../../services/authentication-api";

export default function Signup() {
  const { setIsLoggedIn, setUser } = useContext(LoggedInContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signup({ username, email, password });
      console.log("Signed up:", { username: username, email:email, password:password });
      setIsLoggedIn(true);
      setUser({ id: res.id, name: res.username });
      console.log("Signed up:", res.id);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <form onSubmit={handleSubmit}>
          <input placeholder="Usernme" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
