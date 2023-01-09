export default function AlarmListItem(props) {
  const { user, time, contact, sound } = props;

  
  return (
    <li className="AlarmListItem">
      <p>Time: {time}</p>
      <p>Contact Name: {contact}</p>
      <p>Sound: {sound}</p>
      <br></br>
    </li>
  );
}
