import { useState, useEffect, useRef } from "react";
import "./ActiveSession.scss";
import InputForm from "../InputForm/InputForm";
import TimerDisplay from "../TimerDisplay/TimerDisplay";

import useTimer from "../../hooks/useTimer";
function ActiveSession() {
  const [input, setInput] = useState();

  const [isInputField, setIsInputField] = useState(true);
  const [focusSession, setFocusSession] = useState("");

  const [sessions, setSessions] = useState(0);

  const [shouldFocusInput, setShouldFocusInput] = useState(false)

  const inputRef = useRef(null);

  const {minutes, seconds, buttonText, handleStartStop, timeEditable, handleClear} = useTimer(input || 10, "active")

  function handleBlur(e) {
    if (e.target.value === "") {
      setIsInputField(true);
    } else {
      setIsInputField(false);
    }
  }

  function handleSetFocus(e) {
    setFocusSession(e.target.value);
  }

  function handleClick() {
    setIsInputField(true);  // Show the input field
    setShouldFocusInput(true)
  }

  useEffect(() => {
    if (shouldFocusInput && isInputField && inputRef.current) {
      inputRef.current.focus();  // Focus the input after it becomes visible
    }
  }, [shouldFocusInput, isInputField]);

  return (
    <main className="app">
      <div className="app__focus">
        {isInputField ? (
          <input
            type="text"
            placeholder={focusSession === "" ? "Task for this session?" : ""}
            ref={inputRef}
            className="app__focusInput"
            onChange={handleSetFocus}
            onBlur={handleBlur}
            value={focusSession}
          />
        ) : (
          <h1 className="app__focusSession" onClick={handleClick}>
            {focusSession}
          </h1>
        )}
      </div>
      <div className="app__timerDisplay">
        <TimerDisplay minutes={minutes} seconds={seconds} />
        <InputForm
          input={input}
          setInput={setInput}
          buttonText={buttonText}
          timeEditable={timeEditable}
          handleStartStop={handleStartStop}
          handleClear={handleClear}
        />
      </div>
    </main>
  );
}

export default ActiveSession;
