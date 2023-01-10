import React from 'react';
import { useContext } from 'react';
import { AlarmContext } from '../components/context/AlarmProvider';

import NotificationAlert from '../components/NotificationAlert/NotificationAlert';



function Notification() {
  const { notification, setNotification } = useContext(AlarmContext)

  console.log("notification", notification)

  // setNotification(true)
  
    return (
      <div>
      {notification === true && <NotificationAlert />}
      </div>
    );

}

export default Notification;