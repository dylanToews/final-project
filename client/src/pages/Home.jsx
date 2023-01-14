import React from "react";
import { useContext, useState } from "react";
import AlarmOption from "../components/AlarmOption/AlarmOption";
import DigitalClock from "../components/DigitalClock/DigitalClock";
import Header from "../components/Header";
import AlarmList from "../components/AlarmList/AlarmList";
import { AlarmContext } from "../components/context/AlarmProvider";

function Home() {
  const {
    notification,
    setNotification,
    notificationDetails,
    setNotificationDetails,
  } = useContext(AlarmContext);

  const testingNotificationDetails = {
    alarm_time: "11:37 AM:00",
    contact_name: "Dylan",
    contact_number: "7802386933",
    sound_name: "Test recording ",
    sound_url: "soft_wakeup.ogg",
  };

  function setTestStart() {
    setNotificationDetails(testingNotificationDetails);
    setNotification(true);
  }

  return (
    <div className="App">
      <Header />
      <main>
        <section className="clock container">
          <div className="clock__container grid">
            <DigitalClock />
            <div className="card">
              <AlarmOption />
            </div>
            <AlarmList />
            <button onClick={setTestStart} className="submit">
              Test Notification
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
