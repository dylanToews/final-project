import React from 'react';
import AlarmOption from '../components/AlarmOption/AlarmOption';
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
                <DigitalClock />
                <AlarmOption/>
                <AlarmList />
            </div>
          </div>
        </section>
      </main>
    </div>
    );
}

export default Home;