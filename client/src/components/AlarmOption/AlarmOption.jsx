import React, { useContext, useState } from "react";
import "./AlarmOption.css";
import { minutesNumber, hourNumber } from "../../func";
import useSelect from "../../hook/useSelect";
import { AlarmContext } from "../context/ContextAlarm";

function AlarmOption(props) {
  const [hour, setHour] = useSelect("Hour");
  const [minutes, setMinutes] = useSelect("Minutes");
  const [amPmOption, setAmPmOption] = useSelect("Am-Pm");

  const { setAlarmTime, pauseAlarm, hasAlarm, setHasAlarm } =
    useContext(AlarmContext);

  const { onSubmit, sounds, contacts, alarms } = props;

  const initialValues = {
    contact: "",
    sound: "",
    hour: "",
    minutes: "",
    amPmOption: ""
  };

  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };






  const parsedContacts = contacts.map((contact) => (
    <option key={contact} value={contact}>
      {contact}
    </option>
  ));

  const parsedSounds = sounds.map((sound) => (
    <option key={sound} value={sound}>
      {sound}
    </option>
  ));

  const parsedAlarms = alarms.map((alarm) => (
    <option key={alarm} value={alarm}>
      {alarm}
    </option>
  ));

  
  const setAlarm = (event) => {
    if (hasAlarm) {
      pauseAlarm();
      setHasAlarm(false);
      return;
    }
      setHasAlarm(true);
      setAlarmTime(`${hour}:${minutes} ${amPmOption}`);
      if (formData.contact && 
          formData.sound &&
          formData.hour &&
          formData.minutes &&
          formData.amPmOption) {
        onSubmit(formData);
      }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.contact && formData.sound) {
      onSubmit(formData);
      setFormData(initialValues);
    }
    //could add error state here -- populate error state if all forms are not selected
  };



  return (
    <div className="option-Container">
      <div className={`wrapper-option ${hasAlarm && "disable"}`}>
        <select name="hour" value={formData.hour} onChange={handleChange}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumber.map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select name="minutes" value={formData.minutes} onChange={handleChange}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes, index) => (
            <option key={index} value={minutes}>
              {minutes}
            </option>
          ))}
        </select>
        <select name="amPmOption" value={formData.amPmOption} onChange={handleChange}>
          <option disabled value="Am-Pm">
            Am/Pm
          </option>
          <option value="AM">Am</option>
          <option value="PM">Pm</option>
        </select>

      <select name="contact" value={formData.contact} onChange={handleChange}>
        <option value="">Please Select A Contact</option>
        {parsedContacts}
      </select>

      <select name="sound" value={formData.sound} onChange={handleChange}>
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
