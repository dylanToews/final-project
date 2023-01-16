import ReactHowler from "react-howler";
import { useContext } from "react";
import { alarmContext } from "../../context/AlarmProvider";
import NotificationAlert from "./NotificationAlert";


function Notification() {
  const { notification, notificationDetails } = useContext(alarmContext);

  let parsedSoundString = "";

  if (notificationDetails) {
    parsedSoundString = "/audio/" + notificationDetails.sound_url;
  }

  return (
    <div>
      {notification === true && (
        <ReactHowler
          src={parsedSoundString}
          playing={notification}
          loop={notification}
        />
      )}
      {notification === true && <NotificationAlert />}
    </div>
  );
}

export default Notification;
