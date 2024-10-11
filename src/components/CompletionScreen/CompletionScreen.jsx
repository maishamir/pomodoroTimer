import React, { useEffect } from "react";
import "./CompletionScreen.scss";

function CompletionScreen({ changeScreen }) {

  console.log("change scrreen? ", changeScreen)
  
  function chooseSession(e) {
    e.preventDefault();
    changeScreen(e.target.value)
  }

  return (
    <div className="completionScreen">
      <h1 className="completionScreen__title">Great job!</h1>
      <h2 className="completionScreen__subtitle">What's next?</h2>

      <div className="completionScreen__buttons">
        <button className="completionScreen__button" onClick={chooseSession} value="shortBreak">Short break</button>
        <button className="completionScreen__button" onClick={chooseSession} value="longBreak">Long break</button>
        <button className="completionScreen__button" onClick={chooseSession}  value="active">New Session</button>
      </div>
    </div>
  );
}

export default CompletionScreen;
