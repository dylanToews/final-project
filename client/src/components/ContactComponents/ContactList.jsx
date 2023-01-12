import { useState, useContext } from "react";
import { AlarmContext } from "../context/AlarmProvider";
// import { authContext } from "../../providers/AuthProvider";

import ContactListItem from "./ContactListItem";

export default function ContactList() {

  const { alarmItems, contactItems } = useContext(AlarmContext);

  const parsedContactItems = contactItems.map((contactItem) => (
    <ContactListItem key={contactItem.id} {... contactItem} />
  ))


  return (
    <section className="ContactList">
    <h2>Existing Contacts</h2>
    <br/>
    <ul>
      {[parsedContactItems]}
    </ul>
  </section>
  )

}