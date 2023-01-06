import { useState } from "react";

import Header from "./components/Header";
import AlarmForm from "./components/AlarmForm";
import ContactForm from "./components/ContactForm";
import AlarmList from "./components/AlarmList";

import "./App.css";

import mockContactData from "./data/mockContactData"

function App() {
  const [contacts, setContacts] = useState(mockContactData)
   
  return (
    <div className="App">
      <Header />
      <main>
        <section>
          <AlarmForm />
          <ContactForm />
        </section>
        <AlarmList contacts={contacts}/>
      </main>
    </div>
  );
} 

export default App;
