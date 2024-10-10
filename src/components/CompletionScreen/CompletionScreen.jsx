import React from "react";
import "./CompletionScreen.scss";

function CompletionScreen() {
  return (
    <div className="completionScreen">
      <h1 className="completionScreen__title">Great job!</h1>
      <h2 className="completionScreen__subtitle">What's next?</h2>

      <div className="completionScreen__buttons">
        <button className="completionScreen__button">Short break</button>
        <button className="completionScreen__button">Long break</button>
        <button className="completionScreen__button">New Session</button>
      </div>
    </div>
  );
}

export default CompletionScreen;
