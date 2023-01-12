import { useContext, useState } from "react";

import { AlarmContext } from "../context/AlarmProvider";
import axios from "axios";

export default function ContactListItem(props) {
  const { contact_name, contact_number, id, user_email } = props;
  const { contactItems, setContactItems } = useContext(AlarmContext);

  const removeContact = (id) => {
    const filtered = (current) =>
      current.filter((contact) => {
        return contact.id !== id;
      });
      setContactItems(filtered)
      console.log(id)
      axios.delete(`api/v1/contactItems/${id}`).then((res) => {
      console.log("deleted contact with id:", id )
  })
};

  return (
    <li className="ContactListItem">
      <div key={id}>
        <p>Contact Name: {contact_name}</p>
        <p>Phone Number: {contact_number}</p>
        <button onClick={() => removeContact(id)}>Delete</button>
      </div>
      <br></br>
    </li>
  );
}
