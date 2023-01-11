import { AlarmContext } from "../context/AlarmProvider";

export default function AlarmListItem(props) {
  
  const { user, hour, minutes, amPmOption, contact_name, sound_name } = props;

  
  return (
    <li className="AlarmListItem">
      <p>Time: {`${hour}:${minutes} ${amPmOption}`}</p>
      <p>Contact Name: {contact_name}</p>
      <p>Sound: {sound_name}</p>
      <br></br>
    </li>
  );
}
