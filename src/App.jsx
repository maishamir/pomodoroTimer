import React, { useState } from "react";
import ActiveSession from "./components/ActiveSession/ActiveSession";
import CompletionScreen from "./components/CompletionScreen/CompletionScreen";
import BreakScreen from "./components/BreakScreen/BreakScreen";
import Header from "./components/Header/Header";
import InputForm from "./components/InputForm/InputForm";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";

function App() {
  const [screen, setScreen] = useState("active");
  const [status, setStatus] = useState("active")

  function handleChangeScreen(newScreen) {
    setScreen(newScreen)
  }

  return (
    <>
      <Header status={status} />
      <InputForm status={status} />
      {/* {screen == "active" && <ActiveSession changeScreen={handleChangeScreen} />}
      {screen == "break" && <BreakScreen session={"break"} changeScreen={handleChangeScreen}/>}
      {screen == "complete" && <CompletionScreen changeScreen={handleChangeScreen} />} */}
    </>
  );
}

export default App;
