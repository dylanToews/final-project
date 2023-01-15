import React, { useContext } from "react";
import "../../styles/Cards.css";
import "../../styles/DigitalClock.css"
import { AlarmContext } from "../context/AlarmProvider";

function DigitalClock() {
  const { hourDigital, minutesDigital, secondsDigital, amPm, dayNow, monthNow, yearNow } =
    useContext(AlarmContext);

  return (
    <div>
      <div className="clock__text">
        <div className="clock__text-hour">{`${hourDigital}:`}</div>
        <div className="clock__text-minutes">{minutesDigital}</div>
        <div className="clock__text-seconds">{secondsDigital}</div>
        <div className="clock__text-ampm">{amPm}</div>
      </div>

      <div className="clock__date">
        <span>{`${dayNow} `}</span>
        <span>{`${monthNow} , `}</span>
        <span>{yearNow}</span>
      </div>
    </div>
  );
}

export default DigitalClock;
