import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AlarmContext } from "../context/AlarmProvider";

export default function NotificationAlert(props) {
  const { setNotification, notificationDetails } = useContext(AlarmContext);

  const contactName = notificationDetails.contact_name

  
  useEffect(() => {
    
    console.log(`sound playing: ${notificationDetails.sound_name}`)
  }, [])


  function sendText() {
    setNotification(false)
    console.log("sending a text")
    axios.post("/api/v1/sendSMS", { contactName }).then((res) => {
    console.log(`text sent to ${contactName}`)  

    })
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
