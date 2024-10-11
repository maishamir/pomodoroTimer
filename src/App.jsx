import React, { useState } from "react";
import ActiveSession from "./components/ActiveSession/ActiveSession";
import CompletionScreen from "./components/CompletionScreen/CompletionScreen";
import BreakScreen from "./components/BreakScreen/BreakScreen";

function App() {
  const [sessionType, setSessionType] = useState("active");

  return (
    <>
      {sessionType == "active" && <ActiveSession />}
      {/* {sessionType == "longBreak" && <BreakScreen type={"long"}/>} */}
      {sessionType == "shortBreak" && <BreakScreen type={"short"}/>}
      {/* // <ActiveSession /> */}
      {/* // <CompletionScreen /> */}
    </>
  );
}

export default App;
