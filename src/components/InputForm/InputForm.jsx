import React from "react";
import "./InputForm.scss";
// import restartIcon from "../../assets/restart.svg"
import Buttons from "../Buttons/Buttons";

function InputForm({
  input,
  setInput,
  buttonText,
  timeEditable,
  handleStartStop,
  handleClear,
  status = "active"
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
      <Buttons status={status} buttonText={buttonText} handleClear={handleClear} />
    </form>
  );
}

export default InputForm;
