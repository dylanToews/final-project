import { useContext } from "react";
import "../styles/Nav.css";
import { Link } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";

import "../styles/Cards.css"

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
      className="p-3"
    >
      <Navbar.Brand className="me-auto">
        <img
          src={require('../startle.png')}
          width="50"
          height="50"
          className="d-inline-block align-top nav-background"
          alt="Startle logo"
        />
      </Navbar.Brand>

      
      { user && <>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className="mr-2 nav-background"
      />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="nav-item dropright ml-auto nav-background"
      >
        <Nav className="mt-auto justify-content-end nav-background">
        <p className="nav-background nav-welcome Name-Space">Hi, {user.name}!</p>
          <Nav.Link className="nav-background Nav-Butts" as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link className="nav-background Nav-Butts" as={Link} to="/Contacts">
            Contacts
          </Nav.Link>
          <Nav.Link className="nav-background Nav-Butts" as={Link} to="/Sounds">
            Sounds
          </Nav.Link>
          <Nav.Link className="nav-background Nav-Butts" as={Link} to="/About">
            About
          </Nav.Link>
          <Button
        variant="outline-secondary"
        onClick={logout}
        className="mt-auto me-2 logout-button Button-Spacing"
        // className="me-2"
      >
        Log out
      </Button>
        </Nav>
      </Navbar.Collapse>
      </>}
    </Navbar>
  );
}

export default NavbarComponent;
