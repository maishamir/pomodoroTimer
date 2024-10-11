import { useState, useEffect } from "react";
import notificationSound from "../assets/Timer complete.mp3";
import useSound from "use-sound";

function useTimer(initialMinutes = 10, sessionType) {
  //define states for minutes, seconds, and isRunning
  //states common between active sessions and breaks
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [isTimerCleared, setIsTimerCleared] = useState(false);

  // only for active sessions
  const [timeEditable, setTimeEditable] = useState(true);

  // notification sound
  const [playSound] = useSound(notificationSound, {
    volume: 2.0,
  });


  // function to start timer
  function handleStartStop(e) {
  e.preventDefault();

  // The input (minutes) comes from ActiveSession
  if (isRunning) {
    setIsRunning(false);
    setButtonText("Start");
  } else {
    if (isTimerCleared) {
      setMinutes(initialMinutes);  // Reset to inputted or default minutes
      setSeconds(0);
      setIsTimerCleared(false);
    }
    setIsRunning(true);
    setButtonText("Pause");
  }

  sessionType === "active" && setTimeEditable(false);
}

  // function to reset/clear the timer
  function handleClear() {
    setMinutes(initialMinutes || 10)
    setSeconds(0);
    setIsRunning(false);
    setButtonText("Start");
    setIsTimerCleared(true)
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
          // return 59;
          return 1; //TODO: REMOVE BEFORE PUSHING TO MAIN; ONLY FOR TESTING PURPOSES
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
    minutes,
    seconds,
    buttonText,
    handleStartStop,
    handleClear,
    timeEditable,
  };
}

export default useTimer;
