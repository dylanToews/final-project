import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import {Howl} from "howler";


export default function NotificationAlert(props) {
  const { setNotification, notificationDetails } = useContext(AlarmContext);

  const contactName = notificationDetails.contact_name

  const audioTest = "http://localhost:8080/audio/1673469843174.ogg"

const soundPlay = (src) => {
  const sound = new Howl ({
    src,
    html5: true,
    loop: true
  })
  sound.play()
}


  useEffect(() => {
    
    console.log(`sound playing: ${notificationDetails.sound_name}`)

    soundPlay(audioTest)
    soundPlay.loop = true

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
