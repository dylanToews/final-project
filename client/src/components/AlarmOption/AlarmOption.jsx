import { useContext, useState, useEffect } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import { minutesNumber, hourNumber } from "../../func";
import AlarmListItem from "../AlarmList/AlarmListItem";
import { Button } from "react-bootstrap";
import "../../styles/AlarmOption.css";
import "../../styles/Alarms.css";
import "../../styles/Dropdowns.css";
import "../../styles/Contacts.css";
import "../../styles/Cards.css";

function AlarmOption(props) {
  const {
    id,
    flipCard,
    hour,
    minutes,
    am_pm,
    contact_name,
    sound_name,
    active,
    alarm_name,
    currentAlarmItem
  } = props;

  // console.log("id",id)
  useEffect(() => {
    // console.log(currentAlarmItem);
  }, []);
  const {
    hasAlarm,
    addNewParams,
    contactItems,
    soundItems,
    flip,
    setFlip,
    editOptions,
    setEditOptions,
    editValues,
    setEditValues
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



  useEffect(()=> {
    console.log("editOptions", editValues[0])
  
    },[editOptions])

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
    if (
      formData.contact_name &&
      formData.sound_name &&
      formData.hour &&
      formData.minutes &&
      formData.am_pm &&
      formData.alarm_name
      //could add error state here -- populate error state if all forms are not selected
    ) {
      addNewParams(formData);
      setFormData(initialValues);
      if (!flipCard) {
        setFlip(!flip);
      }
    } else {
    }
  };

  let editStatus = false;

  if (editOptions === true) {
    editStatus = true;
    setAlarm();
  }

  useEffect(() => {
    if (editStatus === true) {
      setEditOptions(false);
    }
  }, [editStatus]);

  return (
    <div className="option-Container card-background">
      <div className={`wrapper-option ${hasAlarm && "disable"} card-background`}>
        <div className="name-row">
          <input
            className="inputBox"
            type="text"
            name="alarm_name"
            required
            maxLength="28"
            size="30"
            placeholder={editValues[0].alarm_name}
            onChange={handleChange}
          />
        </div>
        <div className="time-row card-background">
          <select
            name="hour"
            value={formData.hour}
            onChange={handleChange}
            className="Minkowski"
          >
            <option value="" disabled defaultValue={""} hidden>
            {editValues[0].hour}
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
            {editValues[0].minutes}
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
            {editValues[0].am_pm}
            </option>
            <option value="AM">Am</option>
            <option value="PM">Pm</option>
          </select>
        </div>
        <div className="option-Container card-background">
          <select
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            className="Selection"
          >
            <option value="">{editValues[0].contact_name}</option>
            {parsedContacts}
          </select>

          <select
            id="sound_id"
            name="sound_name"
            value={formData.sound_name}
            onChange={handleChange}
            className="Selection"
          >
            <option value="">{editValues[0].sound_name}</option>
            {parsedSounds}
          </select>
          <div className="Contacts-Sound"></div>
        </div>

        {flip && (
          <Button variant="outline-secondary" onClick={setAlarm}>
            Set New Alarm
          </Button>
        )}
        {flip && (
          <Button variant="outline-secondary" onClick={() => setFlip(!flip)}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

export default AlarmOption;
