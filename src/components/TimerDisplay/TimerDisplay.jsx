import React from "react";

function TimerDisplay({minutes, seconds}) {
  return (
    <div>
      {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default TimerDisplay;
