import { useState, useEffect, useRef } from "react";
import "./ActiveSession.scss";
import InputForm from "../InputForm/InputForm";
import TimerDisplay from "../TimerDisplay/TimerDisplay";

import useTimer from "../../hooks/useTimer";
function ActiveSession({changeScreen}) {
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
    setShouldFocusInput(false);

    // console.log(`Value of shouldFocusInput: ${shouldFocusInput}`)
  }

  function handleSetFocus(e) {
    setFocusSession(e.target.value);
  }

  function handleClick() {
    setIsInputField(true);  // Show the input field
    setShouldFocusInput(true)
    if (shouldFocusInput) {
      setShouldFocusInput(false);
    } else {
      setShouldFocusInput(true);
    }

  }

  // function handleEnter(e) {
  //   if (e.key === "Enter") {
  //     console.log("Enter key was pressed")
  //   }
  // }

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      const delay = setTimeout(() => {
        changeScreen("complete")
      }, 2800)

      return () => clearTimeout(delay)
    }
  }, [minutes, seconds])

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

        <button
          className={`app__editIcon ${
            shouldFocusInput === true ? "app__editIcon--active" : ""
          }`}
        >
          <EditIcon sx={{ fontSize: 30 }} onClick={handleClick} />
        </button>

        <div className="app_setFocus">
          {isInputField ? (
            <input
              type="text"
              placeholder={
                focusSession === "" ? "Set a focus for this active session" : ""
              }
              ref={inputRef}
              className="app__focusInput"
              onChange={handleSetFocus}
              onBlur={handleBlur}
              value={focusSession}
              // onKeyPress={handleEnter}
            />
          ) : (
            <h1 className="app__focusSession">{focusSession}</h1>
          )}
        </div>
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
