import { useContext } from "react";
// import "../../styles/Nav.css";
import { Link } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";

import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Badge,
} from "react-bootstrap";

function NavbarComponent() {
  const { user, logout } = useContext(authContext);

  return (
    
    <Navbar
      collapseOnSelect="true"
      expand="lg"
      bg="dark"
      variant="dark"
      className="p-3 "
    >
      <Navbar.Brand className="me-auto">Hello {user.name}</Navbar.Brand>

      <Button
        variant="outline-secondary"
        onClick={logout}
        className="mt-auto me-2"
        // className="me-2"
      >
        Logout
      </Button>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className="mr-2"
      />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="nav-item dropright ml-auto"
      >
        <Nav className="mt-auto justify-content-end">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/Contacts">
            Contacts
          </Nav.Link>
          <Nav.Link as={Link} to="/Sounds">
            Sounds
          </Nav.Link>
          <Nav.Link as={Link} to="/About">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/Login_Register">
            Login{" "}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
