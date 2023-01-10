import { createContext, useState } from "react";

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  //Perform login process for the user & save authID, etc
  const login = function (email, password) {
    setAuth(true);
    const id = "USER_ID"; // axios call here? get user id from DB
    setUser({ email, id, name: "TEST USER" });
  };

  const logout = function() {
    setAuth(false);
    setUser(null);
  };

  // authContext will expose these items
  const userData = { auth, user, login, logout};

  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );

}