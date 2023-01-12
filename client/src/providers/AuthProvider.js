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
    // const id = "USER_ID"; // axios call here? get user id from DB
  };

  const logout = function() {
    setAuth(false);
    setUser(null);
  };

  //auto login for development 

  // useEffect(() => {
  //   setUser({ email: "test@test.ca", id:1, name: "TEST USER" });
  // }, [])


  // authContext will expose these items
  const userData = { auth, user, login, logout};

  // console.log(userData)
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );

}