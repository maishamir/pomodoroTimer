import React from "react";
import "./InputForm.scss";

function InputForm({
  input,
  setInput,
  buttonText,
  isNotCleared,
  handleStartStop,
  handleClear,
}) {
  return (
    <form onSubmit={handleStartStop} className="inputForm">
      <input
        type="number"
        placeholder="# minutes"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isNotCleared}
        className="inputForm__input"
      />
      <div className="inputForm__buttons">
        <button type="submit" className="inputForm__button">
          {buttonText}
        </button>
        <button type="button" onClick={handleClear} className="inputForm__button">
          Clear
        </button>
      </div>
    </form>
  );
}

export default InputForm;
