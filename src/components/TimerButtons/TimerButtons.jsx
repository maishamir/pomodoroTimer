import React from "react";
import restartIcon from "../../assets/restart.svg"
import "./TimerButtons.scss"
import { useNavigate } from "react-router-dom";
import skipIcon from "../../assets/skip.svg"

function TimerButtons({
  input,
  setInput,
  buttonText,
  timeEditable,
  handleStartStop,
  handleClear,
  skip
}) {

    let navigate = useNavigate();
  function renderButtons(skip) {
    
    if (!skip) {
      return (
        <form onSubmit={handleStartStop} className="timerButtons">
          {/* <input
            type="number"
            placeholder="mins"
            value={input}
            onChange={({ target }) => setInput(target.value)}
            disabled={timeEditable ? false : true}
            className="timerButtons__input"
          /> */}
          <div className="timerButtons__buttons">
            <button type="submit" className="timerButtons__button">
              {buttonText}
            </button>
            <img
              src={restartIcon}
              onClick={handleClear}
              alt=""
              className="timerButtons__icon"
            />
          </div>
        </form>
      );
    }
    return (
      <form onSubmit={handleStartStop} className="timerButtons">
        <input
          type="number"
          placeholder="mins"
          value={input}
          onChange={({ target }) => setInput(target.value)}
          disabled={timeEditable ? false : true}
          className="timerButtons__input"
        />
        <div className="timerButtons__buttons">
          <button type="submit" className="timerButtons__button">
            {buttonText}
          </button>
          <img
            src={restartIcon}
            onClick={handleClear}
            alt=""
            className="timerButtons__icon"
          />
          <img src={skipIcon} className="timerButtons__icon" onClick={() => navigate("/")} />
        </div>
      </form>
    );
  }
   return renderButtons(skip);
}

export default TimerButtons;
