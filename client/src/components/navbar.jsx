import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Login_Register">Account</Link>
        </li>
        <li>
          <Link to="/Contacts">Contacts</Link>
        </li>
        <li>
          <Link to="/Sounds">Sounds</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;