import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AlarmContext } from "../context/AlarmProvider";

export default function NotificationAlert() {
  const { notification, setNotification, waiting, setWaiting } = useContext(AlarmContext);

 

  let testNotification = true;

  function changeNotification() {
    setWaiting(true)
    setNotification(false)
    // setTimeout(() => {setWaiting(false)}, 60000)
    return
  }

  // useEffect(() => {
  //   setNotification(true)
  //   // if (testNotification) {
  //   //   setNotification(false);
  //   // }
  // }, [testNotification]);

  return (
    <div>
    <form>
    <h1>THE ALARM HAS GONE OFF!!!!</h1>
    <button onSubmit={changeNotification}>ACCEPT</button>
    </form>
    </div>

  )
  



}
