import React, { useState, useEffect } from "react";
import ActiveSession from "./components/ActiveSession/ActiveSession";
import CompletionScreen from "./components/CompletionScreen/CompletionScreen";
import BreakScreen from "./components/BreakScreen/BreakScreen";
import Header from "./components/Header/Header";
import InputForm from "./components/InputForm/InputForm";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";
import useTimer from "./hooks/useTimer";

function App() {
  const [screen, setScreen] = useState("active");
  const [status, setStatus] = useState("active")

  //user input for custom timer
  const [input, setInput] = useState();

  //set the default minutes based on active or break session
  let initialMinutes = (status == 'active' ? 10 : 5)
  
  const {minutes, seconds, buttonText, handleStartStop, handleClear, timeEditable} = useTimer (input || initialMinutes, status)

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      const delay = setTimeout(() => {
        setStatus("complete")
      }, 2400)
      
      return () => clearTimeout(delay)
    }
  }, [minutes, seconds])

  return (
    <>
      <Header status={status} />
      <TimerDisplay minutes={minutes} seconds={seconds} />
      <InputForm input={input} setInput={setInput} buttonText={buttonText} timeEditable={timeEditable} handleStartStop={handleStartStop} handleClear={handleClear} status={status} />
      {/* {screen == "active" && <ActiveSession changeScreen={handleChangeScreen} />}
      {screen == "break" && <BreakScreen session={"break"} changeScreen={handleChangeScreen}/>}
      {screen == "complete" && <CompletionScreen changeScreen={handleChangeScreen} />} */}
    </>
  );
}

export default App;
