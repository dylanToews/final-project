import { useState } from "react";

import Header from "./components/Header";
import AlarmList from "./components/AlarmList";
import SetAlarmForm from "./components/SetAlarmForm";

import "./App.css";

import mockContactData from "./data/mockContactData";
import mockSoundData from "./data/mockSoundData";
import mockAlarmItemData from "./data/mockAlarmItemData";

function App() {
  const [alarmItems, setAlarmItems] = useState(mockAlarmItemData);

  return (
    <div className="App">
      <Header />
      <main>
        <section>
          <SetAlarmForm />
        </section>
        <AlarmList alarmItems={alarmItems} />
      </main>
    </div>
  );
}

export default App;
