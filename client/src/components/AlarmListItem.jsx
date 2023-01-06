export default function AlarmListItem(props) {
  const { name, tel_number } = props;

  return (
    <li className="AlarmListItem">
      <p>Contact Name: {name}</p>
      <p>Contact Number: {tel_number}</p>
    </li>
  );
}
