import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import { authContext } from "../../providers/AuthProvider";

import { Howl } from "howler";

export default function NotificationAlert(props) {
  const { 
    notification,
    setNotification, 
    notificationDetails, 
    soundItems } =
    useContext(AlarmContext);
  const { user } = useContext(authContext);


  // hard coded notification details object ofr testing purposes
// const notificationDetails = {
//   alarm_time: "11:37 AM:00",
//   contact_name: "Dylan",
//   contact_number: "7802386933",
//   sound_name: "Test recording ",
//   sound_url: "1673633900965.ogg"}



  const twilioData = {
    contact_name: notificationDetails.contact_name,
    contact_number: notificationDetails.contact_number,
    user_name: user.name,
  };
  const contactName = notificationDetails.contact_name;

  // const soundUrl = "/audio/" + notificationDetails.sound_url;

  // const audioTest = `/audio/1673633900965.ogg`;

  // new Audio(audioTest)

  // const newSoundPlay = {
  //   push: new Howl({
  //     src: audioTest,
  //     loop: true,
  //   }),
  // };

  // function startAudio(){
  //   newSoundPlay.push.play()
  // }
  // let stopNotification = false

  // if(notification === false){
  //   newSoundPlay.push.stop()
  //   newSoundPlay.push.unload()
  // }

  // useEffect(() => {

    // if(notification === true){
    //   newSoundPlay.push.play()
    // }
  

    // if(stopNotification){
    //   newSoundPlay.push.stop()
    // }
    // if(stopNotification === false){
      // newSoundPlay.push.play()
    // }
  //   console.log(`sound playing: ${notificationDetails.sound_name}`);
  //   // newSoundPlay.push.play()
  // }, [stopNotification]);

  function sendText() {
    setNotification(false);
    // axios.post("/api/v1/sendSMS", { twilioData }).then((res) => {
    //   console.log(`text sent to ${twilioData}`);
    // });
    return;
  }

  function acceptNotification() {
    setNotification(false);
    // newSoundPlay.push.stop()
    console.log("accept button pressed");
    return;
  }

  return (
    <div>
      <h1>THE ALARM HAS GONE OFF!!!!</h1>
      <button onClick={acceptNotification}>ACCEPT</button>
      <button onClick={sendText}>SNOOZE</button>
    </div>
  );
}
