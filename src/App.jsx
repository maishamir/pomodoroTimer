import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    let currInput = Number(input);
    setMinutes(currInput);
    setSeconds(0);
    setIsRunning(true);
  }
  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
      // handle the seconds
      setSeconds(prevSecond => {
        if (prevSecond > 0) {
          return prevSecond - 1; 
        } else {
          return 59
        }
      })

      // handle the minutes
      if (seconds === 0) {
        setMinutes(prevMinutes => {
          if (prevMinutes > 0) {
            return prevMinutes - 1;
          } else {
            return 0
          }
        })
      }
    };

    const timeoutID = setTimeout(tick, 1000);

    return () => clearTimeout(timeoutID);
  }, [seconds, isRunning]);

  return (
    <>
      <h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter a number of minutes"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Start</button>
        </form>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </>
  );
}

export default App;
