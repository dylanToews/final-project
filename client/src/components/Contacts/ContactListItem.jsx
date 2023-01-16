import axios from "axios";
import { useContext } from "react";
import { alarmContext } from "../../context/AlarmProvider";
import "../../styles/Contacts.css"

export default function ContactListItem(props) {
  const { contact_name, contact_number, id } = props;
  const { setContactItems } = useContext(alarmContext);

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return null;
  }

  const removeContact = (id) => {
    const filtered = (current) =>
      current.filter((contact) => {
        return contact.id !== id;
      });
      setContactItems(filtered)

      axios.delete(`api/v1/contactItems/${id}`).then((res) => {

  })
};

  return (
    <ul className="ContactListItem">
      <div key={id} className="card-background">
        <p className="card-background">Contact Name: {contact_name}</p>
        <p className="card-background">Phone Number: {formatPhoneNumber(contact_number)}</p>
        <button onClick={() => removeContact(id)} className="deleteButton">Delete</button>
      </div>
      <br></br>
    </ul>
  );
}
