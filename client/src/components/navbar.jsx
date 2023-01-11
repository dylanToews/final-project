import { useContext } from "react";
import "../Nav.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";

function Navbar() {
  const { user, logout } = useContext(authContext);

  return (
    <nav className="navHeader">
      {user && <p>Logged in as {user.name}</p>}
      <ul>
        <Link to="/" className="navButton">Home</Link>
        {/* <Link to="/Login_Register" className="navButton">Account</Link> */}
        <Link to="/Contacts" className="navButton">Contacts</Link>
        <Link to="/Sounds" className="navButton">Sounds</Link>
        <Link to="/About" className="navButton">About</Link>
        <button type="button" onClick={logout}>Logout</button>
      </ul>
    </nav>
  );
}

export default Navbar;