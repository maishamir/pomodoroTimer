import React, { useEffect, useState } from "react";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import notificationSound from "../../assets/Timer complete.mp3";
import useSound from "use-sound";
import useTimer from "../../hooks/useTimer"
// import InputForm from "../InputForm/InputForm";
import "./BreakScreen.scss";
import TimerButtons from "../TimerButtons/TimerButtons";
import { useNavigate } from "react-router-dom";

function BreakScreen({ session }) {

  let navigate = useNavigate()
  
  const [input, setInput] = useState();
  const { minutes, seconds, buttonText, handleStartStop, handleClear, timeEditable } = useTimer(input || 5, session)


  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      const delay = setTimeout(() => {
        navigate("/complete")
      }, 2800)
      
      return () => clearTimeout(delay)
    }
  }, [minutes, seconds])

  // function to start timer

  return (
    <div className="breakScreen">
      <h1 className="breakScreen__title">Break</h1>

      <div className="breakScreen__timerDisplay">
        <TimerDisplay minutes={minutes} seconds={seconds} />
        <div className="breakScreen__buttons">
          <TimerButtons input={input} setInput={setInput} buttonText={buttonText} timeEditable={timeEditable} handleStartStop={handleStartStop} handleClear={handleClear} skip={true}/>
        </div>
      </div>
    </div>
  );
}

export default BreakScreen;
