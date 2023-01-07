export default function AlarmListItem(props) {
  const { user, time, contact, sound } = props;

  
  return (
    <li className="AlarmListItem">
      <p>User: {user}</p>
      <p>Time: {time}</p>
      <p>Contact Name: {contact}</p>
      <p>Sound: {sound}</p>
    </li>
  );
}
