import { useState, useEffect, useRef } from "react";
import "./App.scss";
import InputForm from "./components/InputForm/InputForm";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";
import notificationSound from './assets/Timer complete.mp3';
import useSound from "use-sound";

function App() {
  const [input, setInput] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [timeEditable, setTimeEditable] = useState(true);
  const [timerDone, setTimerDone] = useState(false);

  const [isInputField, setIsInputField] = useState(true);
  const [focusSession, setFocusSession] = useState("");

  const [sessions, setSessions] = useState(0);

  const [playSound] = useSound(notificationSound, {
    volume: 2.0
  })

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
    //reset the timer back to the original amount that the user inputted IF there was input
    setMinutes(input ? input : 10);
    setSeconds(0);

    //stop the timer
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
    setIsInputField((prevInputField) => !prevInputField);
  }

  useEffect(() => {
    if (isInputField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputField]);

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

      // handle the seconds
      setSeconds((prevSecond) => {
        if (prevSecond > 0) {
          return prevSecond - 1;
        } else {
          return 59;
        }
      });

      // handle the minutes
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
            onFocus={() => setIsInputField(true)} // Only track the input being active
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
        {/* <p className="app__sessionCount">Sessions: {sessions}</p> */}

      </div>
    </main>
  );
}

export default App;
