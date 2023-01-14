import { useContext } from "react";
import "../Nav.css";
import { Link } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';

function NavbarComponent() {
  const { user, logout } = useContext(authContext);

  return (
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="p-3">

      <Navbar.Brand className="me-auto">Hello {user.name}</Navbar.Brand>
      <button type="button" className="navLogout" onClick={logout}>Logout</button>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="nav-item dropright">
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/Contacts">Contacts</Nav.Link>
        <Nav.Link as={Link} to="/Sounds">Sounds</Nav.Link>
        <Nav.Link as={Link} to="/About">About</Nav.Link>
        <Nav.Link as={Link} to="/Login_Register">Login </Nav.Link>
        </Nav>
      </Navbar.Collapse>
  
  </Navbar>
  );
}

export default NavbarComponent;