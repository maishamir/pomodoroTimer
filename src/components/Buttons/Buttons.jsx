import React from "react";
import restartIcon from "../../assets/restart.svg";
import teaCupIcon from "../../assets/tea-cup.svg";
import clockIcon from "../../assets/alarm-clock.svg";

function Buttons({ status = "active", buttonText, handleClear }) {
  function renderButtons(status) {
    switch (status) {
      case "complete":
        return (
          <div className="completionScreen__buttons">
            <button
              className="completionScreen__button"
              // onClick={chooseSession}
              value="break"
            >
              <img src={teaCupIcon} alt="" className="completionScreen__icon" />
            </button>
            <button
              className="completionScreen__button"
              // onClick={chooseSession}
              value="active"
            >
              <img src={clockIcon} alt="" className="completionScreen__icon" />
            </button>
          </div>
        );
      case "break":
        return (
          <div>
            <button type="submit" className="inputForm__button">
              {buttonText}
            </button>
            <img
              src={restartIcon}
              onClick={handleClear}
              alt=""
              className="inputForm__icon"
            />
            <button
              className="breakScreen__button"
              // onClick={() => changeScreen("active")}
            >
              Skip
            </button>
          </div>
        );
      default:
        return (
          <div>
            <button type="submit" className="inputForm__button">
              {buttonText}
            </button>
            <img
              src={restartIcon}
              onClick={handleClear}
              alt=""
              className="inputForm__icon"
            />
          </div>
        );
    }
  }

  return (
    renderButtons(status)
  );
}

export default Buttons;
