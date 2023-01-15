import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import months from "../../data";
import { authContext } from "../../providers/AuthProvider";

export const AlarmContext = createContext();

function ContextAlarm({ children }) {
  const [hourDigital, setHourDigital] = useState("");
  const [minutesDigital, setMinutesDigital] = useState("");
  const [secondsDigital, setSecondsDigital] = useState("");
  const [amPm, setAmPm] = useState("");
  const [dayNow, setDayNow] = useState("");
  const [monthNow, setMonthNow] = useState("");
  const [yearNow, setYearNow] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [hasAlarm, setHasAlarm] = useState(false);

  const [alarmItems, setAlarmItems] = useState([]);
  const [lastId, setLastId]= useState([])

  const [contactItems, setContactItems] = useState([]);
  const [contactLastId, setContactLastId]= useState([])

  const [soundItems, setSoundItems] = useState([])
  const [soundLastId, setSoundLastId] = useState([])

  const [flip, setFlip] = useState(false)

  const testingNotificationDetails = {
    alarm_time: "11:37 AM:00",
    contact_name: "Dylan",
    contact_number: "7802386933",
    sound_name: "Test recording ",
    sound_url: "soft_wakeup.ogg"}


  const [notification, setNotification] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState();

  const { auth, user } = useContext(authContext);

  ///Notification and alarm logic///

  // hard coded notification details object for testing purposes





  let testNotification = false;



  const notificationDetailsObject = {
    sound_name: "",
    sound_url: "",
    contact_name: "",
    contact_number: "",
    alarm_time: "",
    active: null
  };


  function checkAlarm() {
    const fireAlarm = Object.values(alarmItems).forEach((alarmItem) => {
      const alarmSeconds = "00";
      const parsedAlarmSeconds = parseInt(alarmSeconds)
      const currentSoundItem = soundItems.filter( (e) => {
        return e.sound_name === alarmItem.sound_name
      })

      const currentContactItem = contactItems.filter(function (e) { 
        return e.contact_name === alarmItem.contact_name
      })
      if (
        `${alarmItem.hour}:${alarmItem.minutes} ${alarmItem.am_pm}:${secondsDigital}` ===
        `${hourDigital}:${minutesDigital} ${amPm}:${alarmSeconds}` && alarmItem.active === true
      ) {
        testNotification = true;

        notificationDetailsObject.alarm_time = `${alarmItem.hour}:${alarmItem.minutes} ${alarmItem.am_pm}:${secondsDigital}`;
        notificationDetailsObject.contact_name = alarmItem.contact_name;
        notificationDetailsObject.contact_number = currentContactItem[0].contact_number;
        notificationDetailsObject.sound_name = alarmItem.sound_name;
        notificationDetailsObject.sound_url = currentSoundItem[0].sound_url
        console.log(notificationDetailsObject)
      }
    });
  }

  checkAlarm();

  useEffect(() => {
    if (notificationDetailsObject.alarm_time) {
      setNotificationDetails(notificationDetailsObject);
    }
  }, [notificationDetailsObject.alarm_time]);

  const user_email = user.email;
  
  ///Axios calls and a bit of alarm logic

  useEffect(() => {
    const requests = [
      axios.get(`/api/v1/alarmItems/${user_email}`),
      // axios.get("/api/v1/alarmItemLastId"),
      axios.get(`/api/v1/contactItems/${user_email}`),
      // axios.get("/api/v1/contactItemsLastId"),
      axios.get(`/api/v1/soundItems/${user_email}`)
      // axios.get("/api/v1/soundItemsLastId")
      // axios.get("/api/v1/users"),
      // axios.get("/api/v1/times"),
      // axios.get("/api/v1/sounds"),
    ];
    Promise.all(requests)
      .then((responses) => ({
        alarmItems: responses[0].data,
        lastId: responses[0].data.id,
        contactItems: responses[1].data,
        contactLastId: responses[1].data.id,
        soundItems: responses[2].data,
        soundLastId: responses[2].data.id,
        // users: responses[1].data,
        // times: responses[2].data,
        // sounds: responses[3].data,
        // contacts: responses[4].data,
      }))
      .then(
        ({
          alarmItems,
          lastId,
          contactItems,
          contactLastId,
          soundItems,
          soundLastId,
          // users, times, sounds, contacts
        }) => {
          setAlarmItems(alarmItems);
          setLastId(lastId);
          setContactItems(contactItems);
          setContactLastId(contactLastId);
          setSoundItems(soundItems);
          setSoundLastId(soundLastId);
          // setUsers(users);
          // setSounds(sounds);
          // setContacts(contacts);
          // setAlarms(times);
        }
      );
    // clock functionality logic

    setInterval(() => {
      let date = new Date();

      const addZero = (t) => {
        return ((t < 10) ? '0'+t : t);
      }
      let sec = date.getSeconds()
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
      console.log("alarm has occured");
      setNotification(true);
    }
  }, [testNotification]);

  ///function for adding new alarms. function is called within AlarmOption

  const addNewParams = (formData) => {
    // const id = lastId + 1;
    const currentSoundItem = soundItems.filter( (e) => {
      return e.sound_name === formData.sound_name
    })
    // console.log(currentSoundItem)
    const currentContactItem = contactItems.filter( (e) => {
      return e.contact_name === formData.contact_name
    })
    const newAlarmItem = { 
      user_id: user.id,
      sound_id: currentSoundItem[0].id,
      contact_id: currentContactItem[0].id,
      ...formData

    };
    console.log("newAlarmItem", newAlarmItem);
    axios.post("/api/v1/alarmItems", { newAlarmItem }).then((res) => {
      newAlarmItem.id = res.data.id;
      setAlarmItems([...alarmItems, newAlarmItem]);
    });
  };

  //Original alarm conditional below

  // if (alarmTime === `${hourDigital}:${minutesDigital} ${amPm}`) {
  //   // alarm.play();
  //   // alarm.loop = true;
  //   console.log("alarm has occured")
  // }

  /// not really important but it gives me an error when i delete so im ignoring for now

  const pauseAlarm = () => {
    // alarm.pause();
    setAlarmTime("");
  };

  return (
    <AlarmContext.Provider
      value={{
        hourDigital,
        minutesDigital,
        secondsDigital,
        amPm,
        dayNow,
        monthNow,
        yearNow,
        alarmTime,
        setAlarmTime,
        pauseAlarm,
        hasAlarm,
        setHasAlarm,
        alarmItems,
        setAlarmItems,
        contactItems,
        setContactItems,
        contactLastId,
        soundItems,
        setSoundItems,
        soundLastId,
        setSoundLastId,
        // sounds,
        // alarms,
        addNewParams,
        notification,
        setNotification,
        notificationDetails,
        setNotificationDetails,
        flip,
        setFlip
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}

export default ContextAlarm;
