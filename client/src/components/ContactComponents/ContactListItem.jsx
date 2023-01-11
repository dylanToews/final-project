import { AlarmContext } from "../context/AlarmProvider";

export default function ContactListItem(props) {
  const { contact_name, contact_number } = props;

  return (
    <li className="ContactListItem">
      <p>Contact Name: {contact_name}</p>
      <p>Phone Number: {contact_number}</p>
      <br></br>
    </li>
  );
}
