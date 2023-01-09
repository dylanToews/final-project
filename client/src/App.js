import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import AlarmList from "./components/SetAlarms/AlarmList";
import SetAlarmForm from "./components/tests-and-leftovers/SetAlarmForm";
import SetParamsForm from "./components/tests-and-leftovers/SetParamsForm";

import AlarmOption from "./components/AlarmOption/AlarmOption";
import ContextAlarm from "./components/context/ContextAlarm";
import DigitalClock from "./components/DigitalClock/DigitalClock";

import "./App.css";

//Views -- Mostly test views atm


function App() {


  return (
    <div className="App">
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

export default App;
