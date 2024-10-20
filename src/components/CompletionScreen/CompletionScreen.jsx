import React, { useEffect } from "react";
import "./CompletionScreen.scss";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import clockIcon from "../../assets/alarm-clock.svg";
import teaCupIcon from "../../assets/tea-cup.svg";
import sunshineIcon from "../../assets/sunshine.svg";

function CompletionScreen({ changeScreen }) {

  console.log("change screen? ", changeScreen)
  
  function chooseSession(e) {
    e.preventDefault();
    changeScreen(e.currentTarget.value)
  }

  return (
    <div className="completionScreen">
      <h1 className="completionScreen__title">Great job!</h1>

      <div className="completionScreen__choices">
        <h2 className="completionScreen__subtitle">What's next?</h2>
        <div className="completionScreen__buttons">
          <button className="completionScreen__button" onClick={chooseSession} value="shortBreak">
            <img src={teaCupIcon} alt="" className="completionScreen__icon"/>
          </button>
          <button className="completionScreen__button" onClick={chooseSession} value="longBreak">
            <img src={sunshineIcon} alt="" className="completionScreen__icon"/>
          </button>
          <button className="completionScreen__button" onClick={chooseSession} value="active">
            <img src={clockIcon} alt="" className="completionScreen__icon"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompletionScreen;
