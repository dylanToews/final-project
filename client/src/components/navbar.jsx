import React from "react";
import "../Nav.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navHeader">
      <ul>
        <Link to="/" className="navButton">Home</Link>
        <Link to="/Login_Register" className="navButton">Account</Link>
        <Link to="/Contacts" className="navButton">Contacts</Link>
        <Link to="/Sounds" className="navButton">Sounds</Link>
        <Link to="/About" className="navButton">About</Link>
      </ul>
    </nav>
  );
}

export default Navbar;