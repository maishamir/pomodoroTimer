import { useState, useEffect } from "react";
import notificationSound from "../assets/Timer complete.mp3";
import useSound from "use-sound";

function useTimer(initialMinutes, sessionType) {
  //define states for minutes, seconds, and isRunning
  //states common between active sessions and breaks
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");

  // only for active sessions
  const [timeEditable, setTimeEditable] = useState(true);

  // notification sound
  const [playSound] = useSound(notificationSound, {
    volume: 2.0,
  });

  // function to start timer
  function handleStartStop(e) {
    e.preventDefault();

    // this line is only relevant when it's an active session
    if (isRunning) {
      setIsRunning(false);
      setButtonText("Start");
    } else {
      setMinutes(initialMinutes);
      setSeconds(0);
      setIsRunning(true);
      setButtonText("Pause");
    }
    sessionType === "active" && setTimeEditable(false);
  }

  // function to reset/clear the timer
  function handleClear() {
    setMinutes(initialMinutes);
    setSeconds(0);
    setIsRunning(false);
    setButtonText("Start");
    sessionType === "active" && setTimeEditable(true);
  }

  // useEffect to run the timer; only works when timer is running; obvs lol
  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
      if (seconds === 0 && minutes === 0) {
        playSound();
        setIsRunning(false);
        setButtonText("Start");
        sessionType === "active" && setTimeEditable(true);
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
    
    return {
        minutes, seconds, buttonText, handleStartStop, handleClear, timeEditable
    }
}

export default useTimer;