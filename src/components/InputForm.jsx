import React from "react";

function InputForm({ input, setInput, buttonText, isRunning, handleStartStop}) {
  return (
    <form onSubmit={handleStartStop}>
      <input
        type="number"
        placeholder="Enter a number of minutes"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isRunning}
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default InputForm;
