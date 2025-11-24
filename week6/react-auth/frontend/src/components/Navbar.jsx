import { Link } from "react-router-dom";
import { removeToken } from "../utils/tokenStorage";

function Navbar({ setIsAuthenticated, isAuthenticated }) {
  const handleClick = () => {
    // remove user from storage
    // localStorage.removeItem("user");
    removeToken();
    setIsAuthenticated(false);
  };

  return (
    <nav>
      {isAuthenticated && (
        <div>
          <span>Welcome</span>
          <button onClick={handleClick}>Log out</button>
        </div>
      )}
      {!isAuthenticated && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
