import ReactHowler from "react-howler";
import { useContext } from "react";
import { AlarmContext } from "../components/context/AlarmProvider";
import NotificationAlert from "../components/NotificationAlert/NotificationAlert";


function Notification() {
  const { notification, notificationDetails } = useContext(AlarmContext);

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
