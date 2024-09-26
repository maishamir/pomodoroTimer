import { useState, useEffect } from "react";
import "./App.scss";
import InputForm from "./components/InputForm/InputForm";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";

function App() {
  const [input, setInput] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [isNotCleared, setIsNotCleared] = useState(false);

  const [isInputField, setIsInputField] = useState(true);
  const [focusSession, setFocusSession] = useState("");

  const [sessions, setSessions] = useState(0);

  function handleStartStop(e) {
    e.preventDefault();
    setIsNotCleared(true);

    if (isRunning) {
      setIsRunning(false);
      setButtonText("Start");
    } else {
      const minutesToSet = input ? input : 10;
      setMinutes(minutesToSet);
      setSeconds(0);
      setIsRunning(true);
      setButtonText("Pause");
      setIsNotCleared(true);
    }
  }

  function handleClear() {
    //reset the timer back to the original amount that the user inputted IF there was input
    console.log("clearing timer");
    setMinutes(input ? input : 10);
    setSeconds(0);

    //stop the timer
    setIsRunning(false);
    setButtonText("Start");
    setIsNotCleared(false);
  }

  function handleBlur(e) {
    // alert(`Clicked off input! Current focus: ${focusSession}`)
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
    if (!isRunning) return;

    const tick = () => {
      if (seconds === 0 && minutes === 0) {
        setIsRunning(false);
        setSessions((prevSession) => prevSession + 1);
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
      <div>
        {isInputField ? (
          <input
  type="text"
  placeholder={focusSession === "" ? "What's your focus for this session?" : ""}
  className="app__focusInput"
  onFocus={() => setIsInputField(true)}  // Only track the input being active
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

      <TimerDisplay minutes={minutes} seconds={seconds} />
      <InputForm
        input={input}
        setInput={setInput}
        buttonText={buttonText}
        isNotCleared={isNotCleared}
        handleStartStop={handleStartStop}
        handleClear={handleClear}
      />

      <p>Sessions: {sessions}</p>
    </main>
  );
}

export default App;
