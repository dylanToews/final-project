import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthProvider(props) {
  // AUTH SET TRUE FOR DEV PURPOSES, so login not necessary on refresh
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null); //{ email: "test@test.ca", id:1, name: "TEST USER" } previously used for testing


  //Perform login process for the user & save authID, etc
  const login = function (email, password) {
    axios.get(`/api/v1/users/${email}`)
      .then(res => res.data.user)
      .then(user => {
        console.log("server response: ", user);
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
    if ( data !== null ) {
      const prevUser = JSON.parse(data);
      login(prevUser.email, prevUser.password);

    } 

  }, [])
  
  useEffect(() => {
    if (user !== null ) window.localStorage.setItem("BASIC_USER_AUTH", JSON.stringify(user));
  }, [user])



  const logout = function() {
    setAuth(false);
    setUser(null);
  };


  // authContext will expose these items
  const authData = { auth, user, login, logout}; // userData

  // console.log(userData)
  return (
    <authContext.Provider value={authData}>
      {props.children}
    </authContext.Provider>
  );

}