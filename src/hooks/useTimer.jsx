import { useState, useEffect } from "react";
import notificationSound from "../assets/Timer complete.mp3";
import useSound from "use-sound";

function useTimer(initialMinutes = 10, sessionType) {

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [isTimerCleared, setIsTimerCleared] = useState(true);

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
        setMinutes(initialMinutes); // Reset to inputted or default minutes
        setSeconds(0);
        setIsTimerCleared(false);
      }
      setIsRunning(true);
      setButtonText("Pause");
    }

    setTimeEditable(false)
  }

  // function to reset/clear the timer
  function handleClear() {
    setMinutes(initialMinutes || 10);
    setSeconds(0);
    setIsRunning(false);
    setButtonText("Start");
    setIsTimerCleared(true);
    setTimeEditable(true);
  }

  useEffect(() => {
    if (!isRunning) return;

    const startTime = Date.now();
    const totalTime = (minutes * 60 + seconds) * 1000; // total time in milliseconds
    const endTime = startTime + totalTime;

    function countDown() {
      const currentTime = Date.now();
      const timeRemaining = endTime - currentTime;

      if (timeRemaining <= 0) {
        setMinutes(0);
        setSeconds(0);
        setIsRunning(false);
        playSound();
        return;
      }
      let secondsRemaining = Math.ceil((timeRemaining % 60000) / 1000);
      let minutesRemaining = 0;

      if (secondsRemaining === 60) {
         secondsRemaining = 0
        minutesRemaining = Math.ceil(timeRemaining / 60000);
      } else {
        minutesRemaining = Math.floor(timeRemaining / 60000);
      }
      setMinutes(minutesRemaining)
      setSeconds(secondsRemaining)
    }

    // Set interval for countdown
    const intervalId = setInterval(countDown, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

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
