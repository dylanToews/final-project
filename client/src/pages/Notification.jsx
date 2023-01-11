import React from 'react';
import { useContext, useState } from 'react';
import { AlarmContext } from '../components/context/AlarmProvider';

import NotificationAlert from '../components/NotificationAlert/NotificationAlert';



function Notification() {
  const { notification, notificationDetails } = useContext(AlarmContext)
  
  // console.log("notification details", notificationDetails)
  

  return (
      <div>
      {notification === true && 
      <NotificationAlert/>}
      </div>
    );

}

export default Notification;