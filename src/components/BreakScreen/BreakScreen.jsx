import React, { useEffect, useState } from "react";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import notificationSound from "../../assets/Timer complete.mp3";
import useSound from "use-sound";
import useTimer from "../../hooks/useTimer"
import "./BreakScreen.scss";

function BreakScreen({ session, changeScreen }) {
  

  const {minutes, seconds, buttonText, handleStartStop, handleClear} = useTimer(10, session)

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      const delay = setTimeout(() => {
        changeScreen("complete")
      }, 2800)
      
      return () => clearTimeout(delay)
    }
  }, [minutes, seconds])

  // function to start timer

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
