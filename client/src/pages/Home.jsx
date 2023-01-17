import { useContext } from 'react';
import AlarmOption from '../components/AlarmOption/AlarmOption';
import DigitalClock from '../components/DigitalClock/DigitalClock';
import Header from '../components/Header';
import AlarmList from '../components/AlarmList/AlarmList';
import { AlarmContext } from "../components/context/AlarmProvider";
import ReactCardFlip from "react-card-flip";
import {Button} from "react-bootstrap"

import "../styles/Cards.css"
import "../styles/ButtonsWrappers.css"

function Home() {
  const {
    setNotification,
    setNotificationDetails,
    flip,
    setFlip,
    setEditValues,
    initialEditValues
  } = useContext(AlarmContext);


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
                  <Button variant="outline-secondary" size="lg" bsclass=".create-btn" className="card-background create-butt" onClick={createAlarmFlip}>
                    Create New Alarm
                  </Button>
                </div>
                <AlarmOption/>
              </ReactCardFlip>

            </div>
            <AlarmList />

          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
