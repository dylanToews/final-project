import { useEffect, useState, useContext } from "react";
import { authContext } from "../providers/AuthProvider";




export default function Login_Register(props) {
  const { setToken } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(authContext);

  async function loginUser(credentials) {
    return fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
  }

  const handleEmail = (ev => setEmail(ev.target.value));
  const handlePassword = (ev => setPassword(ev.target.value));

  const handleSubmit = async ev => {
    ev.preventDefault();
    email && login(email, password);
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
  }

  return (
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
  );
}