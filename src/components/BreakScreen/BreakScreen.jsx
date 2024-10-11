import React, { useEffect, useState } from "react";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import notificationSound from "../../assets/Timer complete.mp3";
import useSound from "use-sound";
import useTimer from "../../hooks/useTimer"
import "./BreakScreen.scss";

function BreakScreen({ type, changeScreen }) {
  
  // set the timer based on user selection
  var timeToSet;
  if (type === "shortBreak") {
    timeToSet = { minutes: 5, seconds: 0 };
  } else if (type === "longBreak") {
    timeToSet = { minutes: 10, seconds: 0 };
  }

  const {minutes, seconds, buttonText, handleStartStop, handleClear} = useTimer(timeToSet.minutes, "break")

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      const delay = setTimeout(() => {
        changeScreen("complete")
      }, 2800)
      
      return () => clearTimeout(delay)
    }
  }, [minutes, seconds])

  // function to start timer

  const [timer, setTimer] = useState(timeToSet);
  return (
    <div className="breakScreen">
      <h1 className="breakScreen__title">Break</h1>
      <TimerDisplay minutes={minutes} seconds={seconds} />
      <div className="breakScreen__buttons">
        <button className="breakScreen__button" onClick={handleStartStop}>{buttonText}</button>
        <button className="breakScreen__button" onClick={handleClear}>Reset</button>
      </div>
    </div>
  );
}

export default BreakScreen;
