import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { months } from "../helpers/alarmHelpers";
import { authContext } from "./AuthProvider";

export const alarmContext = createContext();

function ContextAlarm({ children }) {
  const [hourDigital, setHourDigital] = useState("");
  const [minutesDigital, setMinutesDigital] = useState("");
  const [secondsDigital, setSecondsDigital] = useState("");
  const [amPm, setAmPm] = useState("");
  const [dayNow, setDayNow] = useState("");
  const [monthNow, setMonthNow] = useState("");
  const [yearNow, setYearNow] = useState("");
  const [hasAlarm, setHasAlarm] = useState(false);

  const [alarmItems, setAlarmItems] = useState([]);
  const [contactItems, setContactItems] = useState([]);
  const [soundItems, setSoundItems] = useState([]);
  
  const initialEditValues = {
    active: true,
    alarm_name: "Please Enter Alarm Title",
    am_pm: "AM/PM",
    contact_name: "Please Select A Contact",
    contact_number: "",
    hour: "Hour",
    id: "",
    minutes: "Minutes",
    order_val: "",
    sound_name: "Please Select A Sound",
    sound_string: "",
    user_email: "",
  }

  const [flip, setFlip] = useState(false);
  const [alarmFlip, setAlarmFlip] = useState(new Set());
  const [editOptions, setEditOptions] = useState(false)
  const [editValues, setEditValues] = useState([initialEditValues])

  const [notification, setNotification] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState();

  const { user } = useContext(authContext);

  ///Notification and alarm logic///

  let testNotification = false;

  const notificationDetailsObject = {
    sound_name: "",
    sound_url: "",
    contact_name: "",
    contact_number: "",
    alarm_time: "",
    active: null,
    alarm_name: ""
  };


  function orderedAlarms(alarmItems) {
    // console.log(Object.values(alarmItems))
  }

  function checkAlarm() {
    Object.values(alarmItems).forEach((alarmItem) => {
      const alarmSeconds = "00";
      const currentSoundItem = soundItems.filter((e) => {
        return e.sound_name === alarmItem.sound_name;
      });

      const currentContactItem = contactItems.filter(function (e) {
        return e.contact_name === alarmItem.contact_name;
      });
      if (
        `${alarmItem.hour}:${alarmItem.minutes} ${alarmItem.am_pm}:${secondsDigital}` ===
          `${hourDigital}:${minutesDigital} ${amPm}:${alarmSeconds}` &&
        alarmItem.active === true
      ) {
        testNotification = true;

        notificationDetailsObject.alarm_time = `${alarmItem.hour}:${alarmItem.minutes} ${alarmItem.am_pm}:${secondsDigital}`;
        notificationDetailsObject.contact_name = alarmItem.contact_name;
        notificationDetailsObject.contact_number =
          currentContactItem[0].contact_number;
        notificationDetailsObject.sound_name = alarmItem.sound_name;
        notificationDetailsObject.sound_url = currentSoundItem[0].sound_url;
        notificationDetailsObject.alarm_name = alarmItem.alarm_name
      }
    });
  }

  checkAlarm();



  useEffect(() => {
    // orderedAlarms(alarmItems)
    if (notificationDetailsObject.alarm_time) {
      setNotificationDetails(notificationDetailsObject);
    }
  }, [notificationDetailsObject.alarm_time]);

  const user_email = user.email;

  ///Axios calls and a bit of alarm logic

  useEffect(() => {
  
    const requests = [
      axios.get(`/api/v1/alarms/${user_email}`),
      axios.get(`/api/v1/contactItems/${user_email}`),
      axios.get(`/api/v1/soundItems/${user_email}`),
    ];
    Promise.all(requests)
      .then((responses) => ({
        alarmItems: responses[0].data,
        contactItems: responses[1].data,
        soundItems: responses[2].data,
      }))
      .then(({ alarmItems, contactItems, soundItems }) => {
        setAlarmItems(alarmItems);
        setContactItems(contactItems);
        setSoundItems(soundItems);
      });

    // clock functionality logic

    setInterval(() => {
      let date = new Date();

      const addZero = (t) => {
        return t < 10 ? "0" + t : t;
      };
      let sec = date.getSeconds();
      let HH = date.getHours(),
        MM = date.getMinutes(),
        SS = addZero(sec),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        ampm;

      if (HH >= 12) {
        HH = HH - 12;
        ampm = "PM";
      } else {
        ampm = "AM";
      }

      if (HH === 0) HH = 12;
      if (HH < 10) HH = `0${HH}`;
      if (MM < 10) MM = `0${MM}`;
      //if (SS <10) SS = `0${SS}`;

      setHourDigital(HH);
      setMinutesDigital(MM);
      setSecondsDigital(addZero(sec));
      setAmPm(ampm);
      setDayNow(day);
      setMonthNow(months[month]);
      setYearNow(year);
    }, 1000);

    // alarm logic - to be moved

    if (testNotification) {

      setNotification(true);
    }
  }, [testNotification]);

  ///function for adding new alarms. function is called within AlarmOption
  const addNewParams = (formData) => {
    setEditOptions(initialEditValues)

    const currentSoundItem = soundItems.filter((e) => {
      return e.sound_name === formData.sound_name;
    });

    const getOrderValue =(formData) => {
      let hourVal = parseInt(formData.hour)
      let minVal = parseInt(formData.minutes)

      if(hourVal !== 12 && formData.am_pm !== "PM"){
        hourVal = hourVal * 60
      }
      if(hourVal === 12 && formData.am_pm !== "PM"){
        hourVal = 0
      }
      if(hourVal !== 12 && formData.am_pm === "PM"){
        hourVal = (hourVal * 60) + 720
      }
      if(hourVal === 12 && formData.am_pm === "PM"){
        hourVal = hourVal * 60
      }

      return hourVal + minVal
      // console.log("hourVal:", hourVal, "minVal:", minVal, formData)
    }

    const currentContactItem = contactItems.filter((e) => {
      return e.contact_name === formData.contact_name;
    });
    if (!formData.id) {
      const newAlarmItem = {
        user_id: user.id,
        sound_id: currentSoundItem[0].id,
        contact_id: currentContactItem[0].id,
        order_val:  getOrderValue(formData),
        ...formData,
      };
      // console.log("newAlarmDate", newAlarmItem)

      axios.post("/api/v1/alarms", { newAlarmItem }).then((res) => {
        newAlarmItem.id = res.data.id;
        setAlarmItems([...alarmItems, newAlarmItem]);
        console.log(alarmItems)
      });
    } else {
      const updatedAlarmItem = {
        sound_id: currentSoundItem[0].id,
        contact_id: currentContactItem[0].id,
        order_val:  getOrderValue(formData),
        ...formData,
      };
      axios.put("/api/v1/alarms/edit", { updatedAlarmItem })
        .then((res) => {

          const copiedAlarmItems = [...alarmItems];
          const filteredAlarmItems = copiedAlarmItems.filter((alarm) => {
            return alarm.id !== formData.id;
          });
          setAlarmItems([...filteredAlarmItems, updatedAlarmItem]);
        });
     
    }
  };

  return (
    <alarmContext.Provider
      value={{
        hourDigital,
        minutesDigital,
        secondsDigital,
        amPm,
        dayNow,
        monthNow,
        yearNow,
        hasAlarm,
        setHasAlarm,
        alarmItems,
        setAlarmItems,
        contactItems,
        setContactItems,
        soundItems,
        setSoundItems,
        addNewParams,
        notification,
        setNotification,
        notificationDetails,
        setNotificationDetails,
        flip,
        setFlip,
        alarmFlip, 
        setAlarmFlip,
        editOptions, 
        setEditOptions,
        editValues,
        setEditValues,
        initialEditValues,
     
      }}
    >
      {children}
    </alarmContext.Provider>
  );
}

export default ContextAlarm;
