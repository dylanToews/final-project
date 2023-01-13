import { useContext } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";

export default function AlarmListItem(props) {
  const { id, user, hour, minutes, am_pm, contact_name, sound_name, active } = props;
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

  // find current alarmItem
  const currentAlarmItem = alarmItems.find(alarm => alarm.id === id);
  const alarmItemIndex = alarmItems.map((alarm) => alarm.id).indexOf(id);
  const nextToggle = currentAlarmItem.active ? false : true;

  
  const onToggle = (id) => {
    const updatedAlarmItem = {
      ...currentAlarmItem,
      active: nextToggle
    };
    const updatedAlarmItems = [...alarmItems];
    updatedAlarmItems[alarmItemIndex].active = nextToggle;

    axios.put(`/api/v1/alarmItems/${id}`).then((res) => {
      console.log("active status changed for alarm with id: ", id);

      setAlarmItems(updatedAlarmItems);
    })
  }


  
  return (
    <ul className="AlarmListItem">
      <div className="TimeCardFormat">
        <p className="TimeDisplay">{`${hour}:${minutes}`}</p>
        <p className="AMPM">{`${am_pm}`}</p>
      </div>
      <div className="alarm-toggle">
        <button onClick={() => onToggle(id)}>{active && "ON"}{!active && "OFF"}</button>
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
