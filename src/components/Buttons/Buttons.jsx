import React from "react";
import restartIcon from "../../assets/restart.svg";

function Buttons({ status = "active", buttonText, handleClear }) {
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
      {status === "break" ? (
        <button
          className="breakScreen__button"
          onClick={() => changeScreen("active")}
        >
          Skip
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Buttons;
