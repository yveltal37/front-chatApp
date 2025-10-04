import { useContext } from "react";
import { LoggedInContext } from "../../Hooks/IsLogin";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar(){
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(LoggedInContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="logo">ChatApp</div>
      <div className="links">
        {isLoggedIn ? (
          <>
            <Link to={"/login"} onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
