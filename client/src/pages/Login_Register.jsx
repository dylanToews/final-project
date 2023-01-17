import { useState, useContext } from "react";
import { authContext } from "../providers/AuthProvider";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "../styles/LoginRegister.css";



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
    <>
  <div className="page Login">
    <br/><br/>
  <img
    src={require('../startle.png')}
    width="20%"
    height="20%"
    className="logo"
    alt="Startle logo"
  />
  <h1 className="startle Login" >Welcome to Startle!</h1>
  <br/>
  <Form className="wrapper login-items" onSubmit={handleSubmit}>
  <Form.Group className="mb-3 login-items" controlId="email"onChange={handleEmail}>
    <Form.Label className="Login login-text">Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" className="login-field"/>
    <Form.Text className="Login text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3 login-items" controlId="password"onChange={handlePassword}>
    <Form.Label className="Login login-text">Password</Form.Label>
    <Form.Control type="password" placeholder="Password" className="login-field"/>
  </Form.Group>

  <Button variant="outline-secondary" type="submit"onSubmit={handleSubmit} className="login-button">
    Submit
  </Button>
</Form>

</div> 
<p className="login-gradient" ><br></br></p>
</>
  );
}
