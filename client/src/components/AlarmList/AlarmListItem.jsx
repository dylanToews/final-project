import { useContext } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";

export default function AlarmListItem(props) {
    const { id, user, hour, minutes, am_pm, contact_name, sound_name } = props;
    const {alarmItems, setAlarmItems} = useContext(AlarmContext)
  
    const removeAlarm = (id) => {
      const filtered = (current) =>
        current.filter((alarm) => {
          return alarm.id !== id;
        });
        setAlarmItems(filtered)
        console.log(id)
        axios.delete(`api/v1/alarmItems/${id}`).then((res) => {
        console.log("deleted alarm with id:", id )
    })
  };
  
  return (
    <ul className="AlarmListItem">
      <div className="TimeCardFormat">
        <p className="TimeDisplay">{`${hour}:${minutes}`}</p>
        <p className="AMPM">{`${am_pm}`}</p>
      </div>
      <div>
        <p className="ContactDisplay">Contacts: {contact_name}</p>
        <p className="SoundDisplay">Sound: {sound_name}</p>
        <button onClick={() => removeAlarm(id)}>Delete</button>
      </div>
      <br/>
    </ul>
  );
}
