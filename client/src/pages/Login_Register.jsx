import { useState, useContext } from "react";
import { authContext } from "../providers/AuthProvider";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarComponent from "../components/navbar";

import "../styles/App.css"



export default function Login_Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(authContext);

  const handleEmail = (ev => setEmail(ev.target.value));
  const handlePassword = (ev => setPassword(ev.target.value));

  const handleSubmit = async ev => {
    ev.preventDefault();
    email && login(email, password);
  }

  return (
<div className="Login">
<NavbarComponent />
<h1 className="login-form">Login</h1>
<Form className="wrapper login-form" onSubmit={handleSubmit}>
  <Form.Group className="mb-3 login-input" controlId="email"onChange={handleEmail}>
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3 login-input" controlId="password"onChange={handlePassword}>
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>

  <Button variant="outline-secondary" type="submit"onSubmit={handleSubmit}>
    Submit
  </Button>
</Form>
</div> 
  );
}
