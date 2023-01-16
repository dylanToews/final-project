import { useContext } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import ContactListItem from "./ContactListItem";
import "../../styles/Contacts.css";

export default function ContactList() {
  const { contactItems } = useContext(AlarmContext);

  const parsedContactItems = contactItems.map((contactItem) => (
    <ContactListItem key={contactItem.id} {... contactItem} />
  ))

  return (
    <section className="ContactList">
    <h2>My Contacts</h2>
    <br/>
    <ul>
      {[parsedContactItems]}
    </ul>
  </section>
  )

}