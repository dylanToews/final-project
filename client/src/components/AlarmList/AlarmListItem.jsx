import { useContext } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";

export default function AlarmListItem(props) {
  const { id, hour, minutes, am_pm, contact_name, sound_name, active } = props;
  const {alarmItems, setAlarmItems} = useContext(AlarmContext)
  
  const removeAlarm = (id) => {
    const filtered = (current) =>
      current.filter((alarm) => {
      return alarm.id !== id;
    });
    setAlarmItems(filtered)
    axios.delete(`api/v1/alarmItems/${id}`).then((res) => {
    })
  };

  // find current alarmItem, index, and opposite active state
  const currentAlarmItem = alarmItems.find(alarm => alarm.id === id);
  const alarmItemIndex = alarmItems.map((alarm) => alarm.id).indexOf(id);
  const nextToggle = currentAlarmItem.active ? false : true;

  // active toggle on/off (no notifications sent when off)
  const onToggle = (id) => {
    const updatedAlarmItems = [...alarmItems];
    updatedAlarmItems[alarmItemIndex].active = nextToggle;
    axios.put(`/api/v1/alarmItems/${id}`).then((res) => {
      setAlarmItems(updatedAlarmItems);
    })
  }
  
  return (
    <ul className="AlarmListItem">
      <div className="TimeCardFormat">
        <p className="TimeDisplay">{`${hour}:${minutes}`}</p>
        <p className="AMPM">{`${am_pm}`}</p>
      </div>
      <div>
        <button onClick={() => onToggle(id)} className="alarm-toggle">{active && "ON"}{!active && "OFF"}</button>
      </div>
      <div>
        <p className="ContactDisplay">Contacts: {contact_name}</p>
        <p className="SoundDisplay">Sound: {sound_name}</p>
        <button onClick={() => removeAlarm(id)} className="deleteButton">Delete</button>
      </div>
      <br/>
    </ul>
  );
}
