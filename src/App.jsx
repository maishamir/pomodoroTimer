import { useState, useEffect } from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";

function App() {
  const [input, setInput] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [isNotCleared, setIsNotCleared] = useState(false)

  function handleStartStop(e) {
    e.preventDefault();
    setIsNotCleared(true)

    if (isRunning) {
      setIsRunning(false)
      setButtonText("Start")
    } else {
      const minutesToSet = input ? input : 10;
      setMinutes(minutesToSet)
      setSeconds(0)
      setIsRunning(true)
      setButtonText("Pause")
      setIsNotCleared(true)
    }
  }

  function handleClear() {

    //reset the timer back to the original amount that the user inputted IF there was input
    if (input) {
      setMinutes(input)
    } else {
      setMinutes(10)
    }
    setSeconds(0)

    //stop the timer
    setIsRunning(false)
    setButtonText("Start")
    setIsNotCleared(false)
  }

  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
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
      <h1>
        <TimerDisplay minutes={minutes} seconds={seconds} />
      </h1>
      <InputForm
          input={input}
          setInput={setInput}
          buttonText={buttonText}
          isNotCleared={isNotCleared}
          handleStartStop={handleStartStop}
          handleClear={handleClear}
        />
    </main>
  );
}

export default App;
