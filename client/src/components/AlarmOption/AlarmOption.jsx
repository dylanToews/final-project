import { useContext, useState } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import { minutesNumber, hourNumber } from "../../func";

import "../../styles/AlarmOption.css";
import "../../styles/Alarms.css";
import "../../styles/Dropdowns.css";

function AlarmOption(props) {
  const { id, flipCard, status } = props;

  const {
    hasAlarm,
    addNewParams,
    contactItems,
    soundItems,
    flip,
    setFlip,
  } = useContext(AlarmContext);

  const initialValues = {
    id: id || "",
    alarm_name: "",
    contact_name: "",
    sound_name: "",
    hour: "",
    minutes: "",
    am_pm: "",
    active: true,
  };

  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const parsedContacts = Object.values(
    contactItems.map((alarmItem) => (
      <option key={alarmItem.id} value={alarmItem.contact_name}>
        {alarmItem.contact_name}
      </option>
    ))
  );

  const parsedSounds = Object.values(
    soundItems.map((soundItem) => (
      <option key={soundItem.id} value={soundItem.sound_name}>
        {soundItem.sound_name}
      </option>
    ))
  );

  const setAlarm = (event) => {
    console.log(status)
    if (
      formData.contact_name &&
      formData.sound_name &&
      formData.hour &&
      formData.minutes &&
      formData.am_pm
      //could add error state here -- populate error state if all forms are not selected
    ) {
      addNewParams(formData);
      setFormData(initialValues);
      if(!flipCard){
      setFlip(!flip)}
      if(flipCard){
        flipCard(id)
      }
    }
  };

  return (
    <div className="option-Container">
      <div className={`wrapper-option ${hasAlarm && "disable"}`}>
        <div className="name-row">
          <input type="text" name="alarm_name" required maxLength="28" size="30" onChange={handleChange}/>
        </div>
        <div className="time-row">
          <select
            name="hour"
            value={formData.hour}
            onChange={handleChange}
            className="Minkowski"
          >
            <option value="" disabled defaultValue={""} hidden>
              Hour
            </option>
            {hourNumber.map((hour, index) => (
              <option key={index} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            name="minutes"
            value={formData.minutes}
            onChange={handleChange}
            className="Minkowski"
          >
            <option value="" disabled defaultValue={""} hidden>
              Minutes
            </option>
            {minutesNumber.map((minutes, index) => (
              <option key={index} value={minutes}>
                {minutes}
              </option>
            ))}
          </select>
          <select
            name="am_pm"
            value={formData.am_pm}
            onChange={handleChange}
            className="Minkowski"
          >
            <option value="" disabled defaultValue={""} hidden>
              Am/Pm
            </option>
            <option value="AM">Am</option>
            <option value="PM">Pm</option>
          </select>
        </div>
        <div className="option-Container">
          <select
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            className="Selection"
          >
            <option value="">Please Select A Contact</option>
            {parsedContacts}
          </select>

          <select
            id="sound_id"
            name="sound_name"
            value={formData.sound_name}
            onChange={handleChange}
            className="Selection"
          >
            <option value="">Please Select A Sound</option>
            {parsedSounds}
          </select>
          <div className="Contacts-Sound"></div>
        </div>
        <button onClick={setAlarm}>Set Alarm </button>
        <button onClick={() => setFlip(!flip)}>Cancel</button>
      </div>
    </div>
  );
}

export default AlarmOption;
