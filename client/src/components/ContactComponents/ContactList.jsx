import { useState, useContext } from "react";
import { AlarmContext } from "../context/AlarmProvider";
// import { authContext } from "../../providers/AuthProvider";

import ContactListItem from "./ContactListItem";

export default function ContactList() {

  const { alarmItems } = useContext(AlarmContext)

  const parsedAlarmItems = alarmItems.map((alarmItem) => (
    <ContactListItem key={alarmItem.id} {... alarmItem} />
  ))


  return (
    <section className="ContactList">
    <h2>Existing Contacts</h2>
    <br/>
    <ul>
      {[parsedAlarmItems]}
    </ul>
  </section>
  )

}