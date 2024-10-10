import { useState, useEffect, useRef } from "react";
import "./ActiveSession.scss";
import InputForm from "../InputForm/InputForm";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import notificationSound from "../../assets/Timer complete.mp3"
import useSound from "use-sound";
function ActiveSession() {
  const [input, setInput] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [timeEditable, setTimeEditable] = useState(true);

  const [isInputField, setIsInputField] = useState(true);
  const [focusSession, setFocusSession] = useState("");

  const [sessions, setSessions] = useState(0);

  const [shouldFocusInput, setShouldFocusInput] = useState(false)

  const [playSound] = useSound(notificationSound, {
    volume: 2.0,
  });

  const inputRef = useRef(null);

  function handleStartStop(e) {
    e.preventDefault();
    setTimeEditable(false);

    if (isRunning) {
      setIsRunning(false);
      setButtonText("Start");
    } else {
      const minutesToSet = input ? input : 10;
      setMinutes(minutesToSet);
      setSeconds(0);
      setIsRunning(true);
      setButtonText("Pause");
      setTimeEditable(false);
    }
  }

  function handleClear() {
    setMinutes(input ? input : 10);
    setSeconds(0);
    setIsRunning(false);
    setButtonText("Start");
    setTimeEditable(true);
  }

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

  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
      if (seconds === 0 && minutes === 0) {
        playSound();
        setIsRunning(false);
        setSessions((prevSession) => prevSession + 1);
        setButtonText("Start");
        setTimeEditable(true);
        return;
      }

      setSeconds((prevSecond) => {
        if (prevSecond > 0) {
          return prevSecond - 1;
        } else {
          return 1;
        }
      });

      if (seconds === 0) {
        setMinutes((prevMinutes) => {
          if (prevMinutes > 0) {
            return prevMinutes - 1;
          } else {
            return 0;
          }
        });
      }
    };

    const timeoutID = setTimeout(tick, 1000);
    return () => clearTimeout(timeoutID);
  }, [seconds, isRunning]);

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
