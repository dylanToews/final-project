import React from 'react';
import AlarmOption from '../components/AlarmOption/AlarmOption';
import ContextAlarm from '../components/context/AlarmProvider';
import DigitalClock from '../components/DigitalClock/DigitalClock';
import Header from '../components/Header';
import AlarmList from '../components/SetAlarms/AlarmList';

function Home() {
    return (
      <div className="App">
      <Header />
      <main>
        <section className="clock container">
          <div className="clock__container grid">
            <div className="clock__content grid">
              {/* <ContextAlarm> */}
                <DigitalClock />
                <AlarmOption/>
                <AlarmList />
              {/* </ContextAlarm> */}
            </div>
          </div>
        </section>
      </main>
    </div>
    );
}

export default Home;