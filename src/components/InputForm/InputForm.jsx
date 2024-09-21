import React from "react";

function InputForm({ input, setInput, buttonText, isNotCleared, handleStartStop, handleClear}) {
  return (
    <form onSubmit={handleStartStop} className="inputForm">
      <input
        type="number"
        placeholder="Enter a number of minutes"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isNotCleared}
        className="inputForm__form"
      />
      <button type="submit" className="inputForm__button">{buttonText}</button>
      <button onClick={handleClear} className="inputForm__button">Clear</button>
    </form>
  );
}

export default InputForm;
