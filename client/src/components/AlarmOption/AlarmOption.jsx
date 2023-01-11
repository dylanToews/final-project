import React, { useContext, useEffect, useState } from "react";
import "./AlarmOption.css";
import "../Alarms.css";
import { minutesNumber, hourNumber } from "../../func";
import useSelect from "../../hooks/useSelect";
import { AlarmContext } from "../context/AlarmProvider";

function AlarmOption(props) {
  const [hour, setHour] = useSelect("Hour");
  const [minutes, setMinutes] = useSelect("Minutes");
  const [amPmOption, setAmPmOption] = useSelect("Am-Pm");

  const {
    setAlarmTime,
    pauseAlarm,
    hasAlarm,
    setHasAlarm,
    addNewParams,
    alarmItems,
    contactItems,
  } = useContext(AlarmContext);


  const initialValues = {
    contact_name: "",
    sound_name: "",
    hour: "",
    minutes: "",
    amPmOption: "",
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
    alarmItems.map((alarmItem) => (
      <option key={alarmItem.id} value={alarmItem.sound_name}>
        {alarmItem.sound_name}
      </option>
    ))
  );


  const setAlarm = (event) => {
    if (hasAlarm) {
      pauseAlarm();
      setHasAlarm(false);
      return;
    }
    setHasAlarm(true);
    setAlarmTime(`${hour}:${minutes} ${amPmOption}`);
    if (
      formData.contact_name &&
      formData.sound_name &&
      formData.hour &&
      formData.minutes &&
      formData.amPmOption
    ) {
      addNewParams(formData);
    }
  };

  //Function below moved into setAlarm

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (formData.contact && formData.sound) {
  //     addNewParams(formData);
  //     setFormData(initialValues);
  //   }
  //   //could add error state here -- populate error state if all forms are not selected
  // };

  return (
    <div className="option-Container">
      <div className={`wrapper-option ${hasAlarm && "disable"}`}>
        <div className="time-row">
          <select
            name="hour"
            value={formData.hour}
            onChange={handleChange}
            className="SpaceTime"
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
            className="SpaceTime"
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
            name="amPmOption"
            value={formData.amPmOption}
            onChange={handleChange}
            className="SpaceTime"
          >
            <option value="" disabled defaultValue={""} hidden>
              Am/Pm
            </option>
            <option value="AM">Am</option>
            <option value="PM">Pm</option>
          </select>
        </div>

        <select name="contact_name" value={formData.contact_name} onChange={handleChange}>
          <option value="">Please Select A Contact</option>
          {parsedContacts}
        </select>

        <select name="sound_name" value={formData.sound_name} onChange={handleChange}>
          <option value="">Please Select A Sound</option>
          {parsedSounds}
        </select>
        <div className="Contacts-Sound"></div>
      </div>
      <button
        onClick={setAlarm}
        className={`setAlarm-btn ${hasAlarm && "play"}`}
      >
        {hasAlarm ? "Clear Alarm" : "Set Alarm"}
      </button>
    </div>
  );
}

export default AlarmOption;
