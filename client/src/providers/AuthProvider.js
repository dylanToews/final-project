import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null); 

  //Perform login process for the user & save authID, etc
  const login = function (email, password) {
    axios.get(`/api/v1/users/${email}`)
      .then(res => res.data.user)
      .then(user => {
        if (user) {
          setAuth(true);
          setUser({ 
            email:  user.email,
            id: user.id,
            name: user.name
          });
          
        }
      });

  };

  useEffect(() => {
    const data = window.localStorage.getItem("BASIC_USER_AUTH");
    const prevUser = JSON.parse(data);
    if (prevUser) {
      login(prevUser.email, prevUser.password);

    } 

  }, [])
  
  useEffect(() => {
    if (user !== null ) window.localStorage.setItem("BASIC_USER_AUTH", JSON.stringify(user));
  }, [user])



  const logout = function() {
    setAuth(false);
    setUser(null);
    window.localStorage.setItem("BASIC_USER_AUTH", null)
  };


  // authContext will expose these items
  const authData = { auth, setAuth, user, login, logout}; 

  return (
    <authContext.Provider value={authData}>
      {props.children}
    </authContext.Provider>
  );

}