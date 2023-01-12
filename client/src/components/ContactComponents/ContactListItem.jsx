import { useContext, useState } from "react";

import { AlarmContext } from "../context/AlarmProvider";
import axios from "axios";

export default function ContactListItem(props) {
  const { contact_name, contact_number, id, user_email } = props;
  const { contactItems, setContactItems } = useContext(AlarmContext);

  //   removePeople(e) {
  //     this.setState({people: this.state.people.filter(function(person) {
  //         return person !== e.target.value
  //     })});
  // }

  const removeContact = (id) => {
    const filtered = (current) =>
    current.filter((contact) => {
      return contact.id !== id;
    })
    
    setContactItems(filtered)
    
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
