import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AlarmContext } from "../context/AlarmProvider";

export default function NotificationAlert(props) {
  const { notification, setNotification } = useContext(AlarmContext);

 const phoneNumber = "+17802386933"

  function sendText() {
    setNotification(false)
    console.log("sending a text")
    axios.post("/api/v1/sendSMS", { phoneNumber }).then((res) => {
    console.log("text sent !!!")  

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
