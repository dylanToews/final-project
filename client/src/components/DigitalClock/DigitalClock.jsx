import React, { useContext } from "react";
import "../../styles/Cards.css";
import "../../styles/DigitalClock.scss"
import { AlarmContext } from "../context/AlarmProvider";

function DigitalClock() {
  const { hourDigital, minutesDigital, secondsDigital, amPm, dayNow, monthNow, yearNow } =
    useContext(AlarmContext);

    

  return (
    <>
    <div className="clock-container">
  <div className="clock-col clock__bg">
    <p className="clock-hours clock-timer clock__bg">
      {hourDigital || "00"}
    </p>
    <p className="clock-label clock__bg">
      Hours
    </p>
  </div>
  <div className="clock-col clock__bg">
    <p className="clock-minutes clock-timer clock__bg">
      {minutesDigital || "00"}
    </p>
    <p className="clock-label clock__bg">
      Minutes
    </p>
  </div>
  <div className="clock-col clock__bg">
    <p className="clock-seconds clock-timer clock__bg">
      {secondsDigital || "00"}
    </p>
    <p className="clock-label clock__bg">
      Seconds
    </p>
  </div>
  <div className="clock-col clock__bg">
    <p className="clock__bg clock__am-pm">
      {amPm || "AM"}
    </p>
  </div>
  
</div>
<div className="clock__date ">
        <span className="transparent">{`${dayNow} `}</span>
        <span className="transparent">{`${monthNow} , `}</span>
        <span className="transparent">{yearNow}</span>
      </div>
    </>
  );
}

export default DigitalClock;


{/* <div className="clock-container">
      <div className="clock__text dclock__text">
        <div className="clock__text-hour clock-body">{`${hourDigital}:`}</div>
        <div className="clock__text-minutes clock-body">{minutesDigital}</div>
        <div className="clock__text-seconds clock-body">{secondsDigital}</div>
        <div className="clock__text-ampm clock-body">{amPm}</div>
      </div>

      <div className="clock__date">
        <span>{`${dayNow} `}</span>
        <span>{`${monthNow} , `}</span>
        <span>{yearNow}</span>
      </div>
    </div> */}