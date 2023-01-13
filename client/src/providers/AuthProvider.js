import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthProvider(props) {
  // AUTH SET TRUE FOR DEV PURPOSES, so login not necessary on refresh
  const [auth, setAuth] = useState(true);
  const [user, setUser] = useState({email: "cheever@fakeemail.com", id: 3}); //{ email: "test@test.ca", id:1, name: "TEST USER" } previously used for testing

  // const [userData, setUserData] = useState(null);





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

  // useEffect(() => {
  //   if (user) {
  //     console.log("user is valid!")
  //     const requests = [
  //       axios.get(`api/v1/contacts/${user.id}`),
  //       axios.get(`api/v1/sounds/${user.id}`),
  //       axios.get(`api/v1/alarms/${user.id}`)
  //     ];

  //     Promise.all(requests)
  //       .then((responses) => ({
  //         contacts: responses[0].data.contacts,
  //         sounds: responses[1].data.sounds,
  //         alarms: responses[2].data.alarms
  //       }))
  //       .then(
  //         ({
  //           contacts,
  //           sounds,
  //           alarms
  //         }) => {
  //           setUserData({
  //             contacts,
  //             sounds,
  //             alarms
  //           })
  //         }
  //       );
  //   } else {
  //     setUserData(null);
  //   }
  // }, [user]);

  //auto login for development 

  // useEffect(() => {
  //   setUser({ email: "test@test.ca", id:1, name: "TEST USER" });
  // }, [])


  // authContext will expose these items
  const authData = { auth, user, login, logout}; // userData

  // console.log(userData)
  return (
    <authContext.Provider value={authData}>
      {props.children}
    </authContext.Provider>
  );

}