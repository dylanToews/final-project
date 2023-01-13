import { AlarmContext } from "../context/AlarmProvider";

export default function AlarmListItem(props) {
  
  const { user, hour, minutes, amPmOption, contact_name, sound_name } = props;

  
  return (
    <ul className="AlarmListItem">
      <div className="TimeCardFormat">
        <p className="TimeDisplay">{`${hour}:${minutes}`}</p>
        <p className="AMPM">{`${amPmOption}`}</p>
      </div>
      <div>
        <p className="ContactDisplay">Contacts: {contact_name}</p>
        <p className="SoundDisplay">Sound: {sound_name}</p>
      </div>
      <br/>
    </ul>
  );
}
