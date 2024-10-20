import React, { useState } from "react";
import ActiveSession from "./components/ActiveSession/ActiveSession";
import CompletionScreen from "./components/CompletionScreen/CompletionScreen";
import BreakScreen from "./components/BreakScreen/BreakScreen";

function App() {
  const [screen, setScreen] = useState("active");

  function handleChangeScreen(newScreen) {
    setScreen(newScreen)
  }

  return (
    <>
      {screen == "active" && <ActiveSession changeScreen={handleChangeScreen} />}
      {screen == "shortBreak" && <BreakScreen session={"shortBreak"} changeScreen={handleChangeScreen}/>}
      {screen == "longBreak" && <BreakScreen session={"longBreak"} changeScreen={handleChangeScreen}/>}
      {screen == "complete" && <CompletionScreen changeScreen={handleChangeScreen} />}
    </>
  );
}

export default App;
