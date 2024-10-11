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
      {/* {sessionType == "longBreak" && <BreakScreen type={"long"}/>} */}
      {screen == "break" && <BreakScreen type={"short"}/>}
      {/* // <ActiveSession /> */}
      {screen == "complete" && <CompletionScreen />}
    </>
  );
}

export default App;
