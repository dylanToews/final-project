import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import AlarmList from "./components/SetAlarms/AlarmList";
import SetAlarmForm from "./components/tests-and-leftovers/SetAlarmForm";
import SetParamsForm from "./components/tests-and-leftovers/SetParamsForm";

import AlarmOption from "./components/AlarmOption/AlarmOption";
import ContextAlarm from "./components/context/ContextAlarm";
import DigitalClock from "./components/DigitalClock/DigitalClock";

import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import Login_Register from "./pages/Login_Register";
import Sounds from "./pages/Sounds";

import "./App.css";

//Views -- Mostly test views atm


function App() {


  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Login_Register" element={<Login_Register />} />
            <Route path="Contacts" element={<Contacts />} />
            <Route path="Sounds" element={<Sounds />}/>
            <Route path="About" element={<About />}/>
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>

      <Header />
      <main>
        <section className="clock container">
          <div className="clock__container grid">
            <div className="clock__content grid">
              <ContextAlarm>
                <DigitalClock />
                <AlarmOption/>
                <AlarmList />
              </ContextAlarm>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
