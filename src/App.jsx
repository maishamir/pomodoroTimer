import { useState, useEffect } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import TimerDisplay from "./components/TimerDisplay";

function App() {
  const [input, setInput] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [isNotCleared, setIsNotCleared] = useState(false)

  function handleStartStop(e) {
    e.preventDefault();
    setIsNotCleared(true)
    setIsRunning((prevRunning) => {
      if (prevRunning) {
        return false;
      } else if (minutes === 0 && seconds === 0) {
        let currInput = Number(input);
        setMinutes(currInput);
        setSeconds(0);
        return true;
      } else {
        return true;
      }
    });
    setButtonText((prevText) => {
      if (prevText === "Start") {
        return "Pause";
      } else {
        return "Start";
      }
    });
  }

  function handleClear() {

    //reset the timer back to the original amount that the user inputted
    setMinutes(input)
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
    <>
      <h1>
        <InputForm
          input={input}
          setInput={setInput}
          buttonText={buttonText}
          isNotCleared={isNotCleared}
          handleStartStop={handleStartStop}
        />
        <button onClick={handleClear}>Clear</button>
        <TimerDisplay minutes={minutes} seconds={seconds} />
      </h1>
    </>
  );
}

export default App;
