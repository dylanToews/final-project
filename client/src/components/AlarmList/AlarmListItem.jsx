import { AlarmContext } from "../context/AlarmProvider";

export default function AlarmListItem(props) {
  
  const { user, hour, minutes, am_pm, contact_name, sound_name } = props;

  
  return (
    <li className="AlarmListItem">
      <div className="TimeCardFormat">
        <p className="TimeDisplay">{`${hour}:${minutes}`}</p>
        <p className="AMPM">{`${am_pm}`}</p>
      </div>
      <div>
        <p className="ContactDisplay">Contacts: {contact_name}</p>
        <p className="SoundDisplay">Sound: {sound_name}</p>
      </div>
      <br/>
    </li>
  );
}
