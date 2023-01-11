import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AlarmContext } from "../context/AlarmProvider";

export default function NotificationAlert(props) {
  const { notification, setNotification } = useContext(AlarmContext);

 

  function sendText() {
    setNotification(false)
    console.log("sending a text")
    return 
  }


  function changeNotification() {
    setNotification(false)
    console.log("accept button pressed")
    return
  }



  return (
    <div>
 
    <h1>THE ALARM HAS GONE OFF!!!!</h1>
    <button onClick={changeNotification}>ACCEPT</button>
    <button onClick={sendText}>SNOOZE</button> 

    </div>

  )
  



}
