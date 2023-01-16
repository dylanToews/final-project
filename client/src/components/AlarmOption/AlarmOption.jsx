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
    setEditValues,
    // initialEditValues
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
  }


  const [formData, setFormData] = useState(initialValues);
  
  const [editFormData, setEditFormData] = useState(initialEditValues)

  useEffect(() => {
if(editValues){
  setEditFormData(editValues[0])
  console.log("edit values", editValues)
}

  }, [editValues])
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
    setEditFormData({...editFormData, [name]: value});
    console.log("handle change", editFormData)
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
  }

  const setAlarm = (event) => {
    // if(editStatus === true){

    //   console.log("editFormData", editFormData)
    // }

    if (
      formData.contact_name &&
      formData.sound_name &&
      formData.hour &&
      formData.minutes &&
      formData.am_pm &&
      formData.alarm_name



      //could add error state here -- populate error state if all forms are not selected
    ) {
      // console.log("form Data", formData)
   
      if(editStatus === false){

        addNewParams(formData);
      }
      setFormData(initialValues);
      if (!flipCard) {
        setFlip(!flip);
      }
    } 
  };

  const handleCancel = (event) => {
    setFormData(initialValues);
    setFlip(!flip);
  }

  let editStatus = false;

  if (editOptions === true) {
    editStatus = true;
    // setAlarm();
  }
  
  useEffect(() => {
    if (editStatus === true) {
      setEditOptions(false);
      console.log("edit Values", editValues)
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
            placeholder={"testmode"}
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
            {"testmode"}
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
            {"testmode"}
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
            {"testmode"}
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
            <option value="">{"testmode"}</option>
            {parsedContacts}
          </select>

          <select
            id="sound_id"
            name="sound_name"
            value={formData.sound_name}
            onChange={handleChange}
            className="Selection"
          >
            <option value="">{"testmode"}</option>
            {parsedSounds}
          </select>
          <div className="Contacts-Sound"></div>
        </div>

        {flip && (
          <div className="button-row card-background">
          <Button variant={(formCheck() && "outline-success") || (!formCheck() && "outline-danger")} className={!formCheck() && "disabled"} onClick={setAlarm}>
            Set New Alarm
          </Button>
          </div>
        )}
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
