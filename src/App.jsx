import { useState, useEffect } from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";
import FocusSession from "./components/FocusSession/FocusSession";

function App() {
  const [input, setInput] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [isNotCleared, setIsNotCleared] = useState(false);

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

  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
      if (seconds === 0 && minutes === 0) {
        setIsRunning(false);
        setSessions((prevSession) => prevSession + 1)
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
      <FocusSession />
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
