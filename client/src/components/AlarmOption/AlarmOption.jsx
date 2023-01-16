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
    currentAlarmItem,
  } = props;


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
    setEditValues,
    setEditFlip,
    // initialEditValues
  } = useContext(AlarmContext);

  let editStatus = false;

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

  const initialEditValues = {
    active: true,
    alarm_name: "Please Enter Alarm Title" || editOptions.alarm_name,
    am_pm: "AM/PM",
    contact_name: "Please Select A Contact",
    contact_number: "",
    hour: "Hour",
    id: id || "",
    minutes: "Minutes",
    order_val: "",
    sound_name: "Please Select A Sound",
    sound_string: "",
    user_email: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const [editFormData, setEditFormData] = useState(initialEditValues);

  useEffect(() => {
    if (editValues) {
      setFormData(editValues[0])
      setEditFormData(editValues[0]);
    }
  }, [editValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // setEditFormData({ ...editFormData, [name]: value });
  };

  const setAlarm = (form) => {
    console.log("Inside set Alarm", form)
    if (
      form.contact_name &&
      form.sound_name &&
      form.hour &&
      form.minutes &&
      form.am_pm &&
      form.alarm_name
    ) {
      addNewParams(form);

      // setFormData(initialValues);
      // setEditFormData(initialEditValues)
      if (!flipCard) {
        setFlip(!flip);
      }
    }
  };

  let runEdit = false

  const editOrCreate = (input) => {
    if (input === "create") {
      // console.log("I am created using", formData);
      setAlarm(formData);
      setEditFlip(true)
 
    }
    if (input === "edit") {
      // console.log("I am created using", formData)
      
      // setEditOptions(false)
      setAlarm(formData);
      setEditFormData(initialEditValues)
    }
  };


  if (editOptions === true) {
    editStatus = true;
  }
  
  useEffect(() => {
    if (editStatus === true) {
      setEditOptions(false);
      editOrCreate("edit")
    }
  }, [editStatus]);

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

  const formCheck = () => {
    if (
      formData.contact_name &&
      formData.sound_name &&
      formData.hour &&
      formData.minutes &&
      formData.am_pm &&
      formData.alarm_name
    ) {
      return true;
    }
    return false;
  };

  const handleCancel = (event) => {
    setFormData(initialValues);
    setFlip(!flip);
  };

  return (
    <div className="option-Container card-background">
      <div
        className={`wrapper-option ${hasAlarm && "disable"} card-background`}
      >
        <div className="name-row">
          <input
            className="inputBox"
            type="text"
            name="alarm_name"
            required
            maxLength="28"
            size="30"
            placeholder={editFormData.alarm_name}
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
              {editFormData.hour}
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
              {editFormData.minutes}
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
              {editFormData.am_pm}
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
            <option value="">{editFormData.contact_name}</option>
            {parsedContacts}
          </select>

          <select
            id="sound_id"
            name="sound_name"
            value={formData.sound_name}
            onChange={handleChange}
            className="Selection"
          >
            <option value="">{editFormData.sound_name}</option>
            {parsedSounds}
          </select>
          <div className="Contacts-Sound"></div>
        </div>

        
          <div className="button-row card-background">
            <Button
              variant={
                (formCheck() && "outline-success") ||
                (!formCheck() && "outline-danger")
              }
              className={!formCheck() && "disabled"}
              onClick={() => editOrCreate("create")}
            >
              Set New Alarm
            </Button>
          </div>
    
        {flip && (
          <Button variant="outline-secondary" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

export default AlarmOption;
