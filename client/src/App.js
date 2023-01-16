import { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authContext } from "./context/AuthProvider";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Sounds from "./pages/Sounds";
import Login from "./pages/Login";
import Notification from "./components/Notifications/Notification";
import ContextAlarm from "./context/AlarmProvider";

// import "./App.css";

function App() {
  const { auth } = useContext(authContext);

  return (
    <>
    {!auth && <Login />}
    { auth && <BrowserRouter>
      <ContextAlarm>
      <Notification />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="sounds" element={<Sounds />}/>
          
        </Route>
      </Routes>
      </ContextAlarm>
    </BrowserRouter> }
    </>
  );
}


export default App;
