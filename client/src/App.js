import { useState } from "react";

import Header from "./components/Header";
import AlarmList from "./components/AlarmList";
import SetAlarmForm from "./components/SetAlarmForm";
import UserList from "./components/UserList"

import "./App.css";


import mockAlarmItemData from "./data/mockAlarmItemData";
import mockUserData from "./data/mockUserData";
import { getUserAlarms, getAlarmSounds, getAlarmContact, getAlarmTime } from "./helpers/userHelpers";
import SetParamsForm from "./components/SetParamsForm";
 
function App() {
  const [alarmItems, setAlarmItems] = useState(mockAlarmItemData);
  const [users, setUsers] = useState(getUserAlarms(alarmItems))
  const [sounds, setSounds] = useState(getAlarmSounds(alarmItems))
  const [contacts, setContacts] = useState(getAlarmContact(alarmItems))
  const [alarms, setAlarms] = useState(getAlarmTime(alarmItems))


  const addNewAlarm = (formData) => {
    if(!alarms.includes(formData.time)){
      setAlarms([... alarms, formData.time])
    }

  }

  const addNewParams = (formData) => {
    const id = alarmItems.length + 1
    const newAlarmItem = {id, ...formData}

    setAlarmItems([... alarmItems, newAlarmItem]);    
  }

  return (
    <div className="App">
      <Header />
      <main>
        <section>
          <SetAlarmForm onSubmit={addNewAlarm}/>
          <SetParamsForm 
          onSubmit={addNewParams} 
          users = {users}
          sounds = {sounds}
          contacts = {contacts}
          alarms = {alarms}
          />
          
        </section>
        <AlarmList alarmItems={alarmItems} />
      </main>
    </div>
  );
}

export default App; 
