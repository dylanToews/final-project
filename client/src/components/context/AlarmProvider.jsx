import React, { createContext, useEffect, useState, useContext } from "react";
import months from "../../data";
import axios from "axios";
import { authContext } from "../../providers/AuthProvider";
// import Sound from "../../mixkit-casino-win-alarm-and-coins-1990.mp3";

// const alarm = new Audio(Sound);
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
  const [contactItems, setContactItems] = useState([]);
  const [lastId, setLastId]= useState([])

  // const [sounds, setSounds] = useState([]);
  // const [alarms, setAlarms] = useState([]);

  const [notification, setNotification] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState();

  const { auth, user } = useContext(authContext);

  ///Notification and alarm logic///

  let testNotification = false;

  const notificationDetailsObject = {
    sound_name: "",
    sound_string: "",
    contact_name: "",
    contact_number: "",
    alarm_time: "",
  };

  function checkAlarm() {
    const fireAlarm = Object.values(alarmItems).forEach((alarmItem) => {
      const alarmSeconds = 0;

      if (
        `${alarmItem.hour}:${alarmItem.minutes} ${alarmItem.amPmOption}:${secondsDigital}` ===
        `${hourDigital}:${minutesDigital} ${amPm}:${alarmSeconds}`
      ) {
        testNotification = true;

        notificationDetailsObject.alarm_time = `${alarmItem.hour}:${alarmItem.minutes} ${alarmItem.amPmOption}:${secondsDigital}`;
        notificationDetailsObject.contact_name = alarmItem.contact;
        notificationDetailsObject.sound_name = alarmItem.sound;
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
      axios.get("/api/v1/alarmItemLastId"),
      axios.get(`/api/v1/contactItems/${user_email}`),
      // axios.get("/api/v1/users"),
      // axios.get("/api/v1/times"),
      // axios.get("/api/v1/sounds"),
    ];
    Promise.all(requests)
      .then((responses) => ({
        alarmItems: responses[0].data,
        lastId: responses[1].data,
        contactItems: responses[2].data,
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
          // users, times, sounds, contacts
        }) => {
          setAlarmItems(alarmItems);
          setLastId(lastId)
          setContactItems(contactItems)
          // setUsers(users);
          // setSounds(sounds);
          // setContacts(contacts);
          // setAlarms(times);
        }
      );

    // clock functionality logic

    setInterval(() => {
      let date = new Date();

      let HH = date.getHours(),
        MM = date.getMinutes(),
        SS = date.getSeconds(),
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
      // if (SS <10) SS = `0${SS}`;

      setHourDigital(HH);
      setMinutesDigital(MM);
      setSecondsDigital(SS);
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
    const id = lastId + 1;
    const newAlarmItem = { id, user_email, ...formData };
    setLastId(lastId + 1)
    axios.post("/api/v1/alarmItems", { newAlarmItem }).then((res) => {
      console.log("add new alarmItem sucessful:", newAlarmItem);
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
        contactItems,
        // sounds,
        // alarms,
        addNewParams,
        notification,
        setNotification,
        notificationDetails,
        setNotificationDetails,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}

export default ContextAlarm;
