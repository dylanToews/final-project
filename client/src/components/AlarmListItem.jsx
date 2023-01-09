export default function AlarmListItem(props) {
  const {  hour, minutes, amPmOption, contact, sound } = props;

  
  return (
    <li className="AlarmListItem">
      <p>Time: {`${hour}:${minutes} ${amPmOption}`}</p>
      <p>Contact Name: {contact}</p>
      <p>Sound: {sound}</p>
      <br></br>
    </li>
  );
}
