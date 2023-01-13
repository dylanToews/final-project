import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import { authContext } from "../../providers/AuthProvider";

import {Howl} from "howler";


export default function NotificationAlert(props) {
  const { setNotification, notificationDetails, soundItems } = useContext(AlarmContext);
  const { user } = useContext(authContext)

  const twilioData = {
    contact_name: notificationDetails.contact_name,
    contact_number: notificationDetails.contact_number,
    user_name: user.name
  }
  const contactName = notificationDetails.contact_name

  const soundUrl = "/audio/" + notificationDetails.sound_url;

  const audioTest = "http://localhost:8080/audio/1673469843174.ogg"

const soundPlay = (src, status) => {
  const sound = new Howl ({
    src,
    html5: true,
    loop: true
  })
  if (status=== "play"){
    sound.play()
    }
    if(status=== "stop"){
    sound.stop()
    }
}


  useEffect(() => {
    
    console.log(`sound playing: ${notificationDetails.sound_name}`)

    // soundPlay(soundUrl, "play")

  }, [])



  function sendText() {
    setNotification(false)
    axios.post('/api/v1/sendSMS', {twilioData}).then((res) => {
    console.log(`text sent to ${twilioData}`)  

    })
    return 
  }


  function changeNotification() {
    setNotification(false)
    soundPlay(soundUrl, "stop")
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
