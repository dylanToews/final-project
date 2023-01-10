import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Sounds from "./pages/Sounds";
import Login_Register from "./pages/Login_Register";
import Notification from "./pages/Notification";
import ContextAlarm from "./components/context/AlarmProvider";

import "./App.css";

function App() {
  return (
    <ContextAlarm>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login_register" element={<Login_Register />} />
            <Route path="about" element={<About />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="sounds" element={<Sounds />} />
            <Route path="notification" element={<Notification />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextAlarm>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
