import React, { createContext, useEffect, useState } from "react";
import months from "../../data";
import axios from "axios";
import Notification from "../../pages/Notification";
// import Sound from "../../mixkit-casino-win-alarm-and-coins-1990.mp3";

// const alarm = new Audio(Sound);
export const AlarmContext = createContext();

function ContextAlarm({ children }) {
  const [hourDigital, setHourDigital] = useState("");
  const [minutesDigital, setMinutesDigital] = useState("");
  const [amPm, setAmPm] = useState("");
  const [dayNow, setDayNow] = useState("");
  const [monthNow, setMonthNow] = useState("");
  const [yearNow, setYearNow] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [hasAlarm, setHasAlarm] = useState(false);

  const [alarmItems, setAlarmItems] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [notification, setNotification] = useState(false);
  const [waiting, setWaiting] = useState(false);

  // This conditional is what fires off the alarms.
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const yourFunction = async () => {
    await delay(60000);
    console.log("Waited 60s");
  };

  let waitToReset = false;

  let testNotification = false;

  const waitForAlarm = function () {
    setTimeout(6000);
  };

  console.log("waiting", waiting)
  const fireAlarm = Object.values(alarmItems).forEach((alarmItem) => {
    if (
      waiting === false &&
      `${alarmItem.hour}:${alarmItem.minutes} ${alarmItem.amPmOption}` ===
        `${hourDigital}:${minutesDigital} ${amPm}`
    ) {
      testNotification = true;
    }
  });

  useEffect(() => {
    const requests = [
      axios.get("/api/v1/alarmItems"),
      axios.get("/api/v1/users"),
      axios.get("/api/v1/times"),
      axios.get("/api/v1/sounds"),
      axios.get("/api/v1/contacts"),
    ];
    Promise.all(requests)
      .then((responses) => ({
        alarmItems: responses[0].data,
        users: responses[1].data,
        times: responses[2].data,
        sounds: responses[3].data,
        contacts: responses[4].data,
      }))
      .then(({ alarmItems, users, times, sounds, contacts }) => {
        setAlarmItems(alarmItems);
        // setUsers(users);
        setSounds(sounds);
        setContacts(contacts);
        setAlarms(times);
      });

    setInterval(() => {
      let date = new Date();

      let HH = date.getHours(),
        MM = date.getMinutes(),
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

      setHourDigital(HH);
      setMinutesDigital(MM);
      setAmPm(ampm);
      setDayNow(day);
      setMonthNow(months[month]);
      setYearNow(year);
    }, 1000);

    if (testNotification) {
      console.log("alarm has occured");
      setNotification(true);
    }
  }, [testNotification]);

  // const parsedAlarmItems = `${alarmItems.hour}`

  const addNewParams = (formData) => {
    const id = alarmItems.length + 1;
    const newAlarmItem = { id, ...formData };

    axios.post("/api/v1/alarmItems", { newAlarmItem }).then((res) => {
      console.log("add new alarmItem sucessful");
      console.log(newAlarmItem);
      setAlarmItems([...alarmItems, newAlarmItem]);
    });
  };

  //Original alarm conditional below

  // if (alarmTime === `${hourDigital}:${minutesDigital} ${amPm}`) {
  //   // alarm.play();
  //   // alarm.loop = true;
  //   console.log("alarm has occured")
  // }

  const pauseAlarm = () => {
    // alarm.pause();
    setAlarmTime("");
  };

  return (
    <AlarmContext.Provider
      value={{
        hourDigital,
        minutesDigital,
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
        sounds,
        contacts,
        alarms,
        addNewParams,
        notification,
        setNotification,
        waiting,
        setWaiting
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}

export default ContextAlarm;
