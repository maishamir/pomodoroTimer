import React from "react";
import "./InputForm.scss";

function InputForm({
  input,
  setInput,
  buttonText,
  timeEditable,
  handleStartStop,
  handleClear,
}) {
  return (
    <form onSubmit={handleStartStop} className="inputForm">
      <input
        type="number"
        placeholder="mins"
        value={input}
        onChange={({target}) => setInput(target.value)}
        disabled={timeEditable ? false : true}
        className="inputForm__input"
      />
      <div className="inputForm__buttons">
        <button type="submit" className="inputForm__button">
          {buttonText}
        </button>
        <button type="button" onClick={handleClear} className="inputForm__button">
          Restart
        </button>
      </div>
    </form>
  );
}

export default InputForm;
