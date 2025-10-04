import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../../Hooks/IsLogin";
import './Auth.css';
import { signup } from "../../services/authentication-api";

export default function Signup() {
  const { setIsLoggedIn} = useContext(LoggedInContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Signed up:", { username: username, email:email, password:password });
      const res = await signup({ username, email, password });
      setIsLoggedIn(true);
      console.log("Signed up:", res.data);
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
