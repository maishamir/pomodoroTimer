import React, { useState } from "react";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import notificationSound from "../../assets/Timer complete.mp3";
import useSound from "use-sound";
import "./BreakScreen.scss";

function BreakScreen({ type }) {
  
  // set the timer based on user selection
  var timeToSet;
  if (type === "short") {
    timeToSet = { minutes: 5, seconds: 0 };
  } else if (type === "long") {
    timeToSet = { minutes: 10, seconds: 0 };
  }


  // function to start timer

  console.log(timeToSet);
  const [timer, setTimer] = useState(timeToSet);
  return (
    <div className="breakScreen">
      <h1 className="breakScreen__title">Break</h1>
      <TimerDisplay minutes={timer.minutes} seconds={timer.seconds} />
      <div className="breakScreen__buttons">
        <button className="breakScreen__button">Start</button>
        <button className="breakScreen__button">Reset</button>
      </div>
    </div>
  );
}

export default BreakScreen;
