export default function AlarmListItem(props) {
  const { user, hour, minutes, amPmOption, contact, sound } = props;

  
  return (
    <ul className="AlarmListItem">
      <div className="TimeCardFormat">
        <p className="TimeDisplay">{`${hour}:${minutes}`}</p>
        <p className="AMPM">{`${amPmOption}`}</p>
      </div>
      <div>
        <p className="ContactDisplay">Contacts: {contact}</p>
        <p className="SoundDisplay">Sound: {sound}</p>
      </div>
      <br/>
    </ul>
  );
}
