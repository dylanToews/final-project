import React from 'react';
import { useContext, useState } from 'react';
import { AlarmContext } from '../components/context/AlarmProvider';

import NotificationAlert from '../components/NotificationAlert/NotificationAlert';

//could be a good place to render sounds !!

function Notification() {
  const { notification, setNotification } = useContext(AlarmContext)

    return (
      <div>
      {notification === true && 
      <NotificationAlert/>}
      </div>
    );

}

export default Notification;