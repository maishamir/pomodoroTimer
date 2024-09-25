import React from "react";
import "./TimerDisplay.scss"

function TimerDisplay({ minutes, seconds }) {
  return (
    <h1 className="timerDisplay">
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </h1>
  );
}

export default TimerDisplay;
