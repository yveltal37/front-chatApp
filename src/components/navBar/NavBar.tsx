import { useEffect, useContext } from "react";
import { LoggedInContext } from "../../Hooks/IsLogin";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar(){
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(LoggedInContext);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setUser(null);
    console.log("user logged out");
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
