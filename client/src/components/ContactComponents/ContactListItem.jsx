import axios from "axios";
import { useContext } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import "../../styles/Contacts.css"

export default function ContactListItem(props) {
  const { contact_name, contact_number, id } = props;
  const { setContactItems } = useContext(AlarmContext);

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
      <div key={id} className="card-background make-row">
        <img id="contact-img"src={require('../../person-icon.png')} max-width="100%" height="auto"/>
        <div className="contact-info">

          <p id="contact-name"className="card-background">{contact_name}</p>
          <p id="contact-number"className="card-background">{formatPhoneNumber(contact_number)}</p>
        </div>
        <button onClick={() => removeContact(id)} className="deleteButton squish">Delete</button>
      </div>
      <br></br>
    </ul>
  );
}
