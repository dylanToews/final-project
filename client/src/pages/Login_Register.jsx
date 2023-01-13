import { useEffect, useState, useContext } from "react";
import { authContext } from "../providers/AuthProvider";




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
    </div>
  );
}