import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import AlarmList from "./components/AlarmList";
import SetAlarmForm from "./components/SetAlarmForm";
import SetParamsForm from "./components/SetParamsForm";

import AlarmOption from "./components/AlarmOption/AlarmOption";
import ContextAlarm from "./components/context/ContextAlarm";
import DigitalClock from "./components/DigitalClock/DigitalClock";

import "./App.css";

//Views -- Mostly test views atm

const VIEW = "VIEW";
const NEWTIME = "NEWTIME";
const NEWPARAM = "NEWPARAM";

function App() {
  const [alarmItems, setAlarmItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [viewMode, setViewMode] = useState(VIEW);

  useEffect(() => {
    const requests = [
      axios.get("/api/v1/alarmItems"),
      axios.get("/api/v1/users"),
      axios.get("/api/v1/times"),
      axios.get("/api/v1/sounds"),
      axios.get("/api/v1/contacts"),
    ];
    Promise.all(requests)
      .then((responses) => ({
        alarmItems: responses[0].data,
        users: responses[1].data,
        times: responses[2].data,
        sounds: responses[3].data,
        contacts: responses[4].data,
      }))
      .then(({ alarmItems, users, times, sounds, contacts }) => {
        setAlarmItems(alarmItems);
        setUsers(users);
        setSounds(sounds);
        setContacts(contacts);
        setAlarms(times);
      });
  }, []);

  // Function below unnecessary because alarm time is now handled by contextAlarm. Kept for reference but to be deleted later

  // const addNewAlarm = (formData) => {
  //   if (!alarms.includes(formData.time)) {
  //     axios.post("/api/v1/times", { time: formData.time }).then((res) => {
  //       console.log("add new time successful");
  //       setAlarms([...alarms, formData.time]);
  //     });
  //   }
  // };

  const addNewParams = (formData) => {
    const id = alarmItems.length + 1;
    const newAlarmItem = { id, ...formData };

    axios.post("/api/v1/alarmItems", { newAlarmItem }).then((res) => {
      console.log("add new alarmItem sucessful");
      console.log( newAlarmItem)
      setAlarmItems([...alarmItems, newAlarmItem]);
    });
  };

  return (
    <div className="App">
      <Header />
      <main>
        <section className="clock container">
          <div className="clock__container grid">
            <div className="clock__content grid">
              <ContextAlarm>
                <DigitalClock />
                <AlarmOption
                  onSubmit={addNewParams}
                  sounds={sounds}
                  contacts={contacts}
                  alarms={alarms}
                />
              </ContextAlarm>
            </div>
          </div>
        </section>
        <section>
          {/* <button onClick={() => setViewMode(VIEW)}>VIEW</button>
          <button onClick={() => setViewMode(NEWTIME)}>ADD NEW TIME</button>
          <button onClick={() => setViewMode(NEWPARAM)}>
            ADD NEW PARAMETERS
          </button> */}
          {/* {viewMode === NEWTIME && <SetAlarmForm onSubmit={addNewAlarm} />} */}
{/* 
          <SetParamsForm
            onSubmit={addNewParams}
            users={users}
            sounds={sounds}
            contacts={contacts}
            alarms={alarms}
          /> */}
        </section>
        <AlarmList alarmItems={alarmItems} />
      </main>
    </div>
  );
}

export default App;
