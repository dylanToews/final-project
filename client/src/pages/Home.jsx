import { useContext } from 'react';
import AlarmOption from '../components/AlarmOption/AlarmOption';
import DigitalClock from '../components/DigitalClock/DigitalClock';
import Header from '../components/Header';
import AlarmList from '../components/AlarmList/AlarmList';
import { AlarmContext } from "../components/context/AlarmProvider";
import ReactCardFlip from "react-card-flip";
import {Button} from "react-bootstrap"

import "../styles/Cards.css"

function Home() {
  const {
    setNotification,
    setNotificationDetails,
    flip,
    setFlip,
    setEditValues,
    initialEditValues
  } = useContext(AlarmContext);

  const testingNotificationDetails = {
    alarm_time: "11:37 AM:00",
    contact_name: "Dylan",
    contact_number: "7802386933",
    sound_name: "Test recording ",
    sound_url: "soft_wakeup.ogg",
  };


  function setTestStart() {
    setNotificationDetails(testingNotificationDetails);
    setNotification(true);
  }


  function createAlarmFlip() {
    setFlip(!flip)
    // setEditValues(initialEditValues)

  }

  return (
    <div className="App">
      <Header />
      <main>
        <section className="clock container">
          <div className="clock__container grid">
            <DigitalClock />
            <div className="card card-background">
              <ReactCardFlip isFlipped={flip} flipDirection="vertical" className="card-background">
                <div className="card-background">
                  <Button variant="outline-secondary" size="lg" className="card-background" onClick={createAlarmFlip}>
                    Create New Alarm
                  </Button>
                </div>
                <AlarmOption/>
              </ReactCardFlip>

            </div>
            <AlarmList />
            <button onClick={setTestStart} className="submit">
              Test Notification
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
