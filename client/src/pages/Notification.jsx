import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { AlarmContext } from '../components/context/AlarmProvider';
import ReactHowler from 'react-howler'
import {Howl} from "howler";
import NotificationAlert from '../components/NotificationAlert/NotificationAlert';



function Notification() {
  const { notification, notificationDetails } = useContext(AlarmContext)
  const newSoundUrl = `/audio/1673633900965.ogg`

  // console.log("notification details", notificationDetails)
 


  // function parsedSound() {
  //   let sound = []
  //   if(notification){
  //     sound.push( `${/audio/ + notificationDetails.sound_url}`)
  //   }
  //   return sound
  // }
  
  let parsedSoundString = ""

  if(notificationDetails){
     parsedSoundString = "/audio/" + notificationDetails.sound_url
  }
//   useEffect(() => {

//     const newSoundPlay = {
//       push: new Howl ({
//         src: newSoundUrl,
//         loop: true,
//       })
//     }

//     console.log(notification)
//     if(notification === true){
//       newSoundPlay.push.play()
//     }
//     if(notification === false){
//       console.log("getting to conditional")
//       // newSoundPlay.push.stop()
//       newSoundPlay.push.stop()
//       newSoundPlay.push.loop = false
//     }


// }, [notification])

  return (
      <div>
        {notification === true &&<ReactHowler
          src={parsedSoundString}
          playing={notification}
          loop={notification}
          />}
      {notification === true && 
      <NotificationAlert/>}
      </div>
    );

}

export default Notification;