import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext() as any;
  const handleLogout = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>Note Book</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>&nbsp;
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
