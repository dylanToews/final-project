import { useEffect, useState, useContext } from "react";
import { authContext } from "../providers/AuthProvider";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export default function Login_Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, setAuth } = useContext(authContext);

  const handleEmail = (ev => setEmail(ev.target.value));
  const handlePassword = (ev => setPassword(ev.target.value));

  const handleSubmit = async ev => {
    ev.preventDefault();
    email && login(email, password);
  }

  return (
<div className="Login">
<Form className="wrapper" onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="email"onChange={handleEmail}>
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="password"onChange={handlePassword}>
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>

  <Button variant="primary" type="submit"onSubmit={handleSubmit}>
    Submit
  </Button>
</Form>
</div> 
  );
}








{/* <div className="Login">
<form className="wrapper" onSubmit={handleSubmit}>
  <label>
    <p>Email:</p>
    <input type="text" onChange={handleEmail}/>
  </label>
  <label>
    <p>Password:</p>
    <input type="text" onChange={handlePassword}/>
  </label>
  <div>
    <button type="submit">Log In</button>
  </div>
</form>
</div>  */}