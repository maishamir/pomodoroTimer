import { useState, useEffect, useRef } from "react";
import "./ActiveSession.scss";
// import InputForm from "../InputForm/InputForm";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import useTimer from "../../hooks/useTimer";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import TimerButtons from "../TimerButtons/TimerButtons";
import flameIcon from "../../assets/fire.png";
import darkIcon from "../../assets/darkFilled.png";


function ActiveSession() {


  let navigate = useNavigate();
  const [input, setInput] = useState();

  // const [focusSession, setFocusSession] = useState("Click to set a focus");
  const [focusSession, setFocusSession] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [sessions, setSessions] = useState(0);

  const inputRef = useRef(null);

  const {
    minutes,
    seconds,
    buttonText,
    handleStartStop,
    timeEditable,
    handleClear,
  } = useTimer(input || 10, "active");

  function handleBlur(e) {
    setIsEditing(false);
  }

  function handleSetFocus(e) {
    setFocusSession(e.target.value);
  }

  function handleClick() {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  }

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      const updateCount = sessions + 1;
      setSessions(updateCount);

      localStorage.setItem("sessionCount", updateCount);
      const delay = setTimeout(() => {
        navigate("/complete");
      }, 1800);

      return () => clearTimeout(delay);
    }
  }, [minutes, seconds]);

  // to get the saved sessionCount from localStorage
  useEffect(() => {
    if ("sessionCount" in { ...localStorage }) {
      const countNumber = Number.parseInt(localStorage.getItem("sessionCount"));
      setSessions(countNumber);
    }
  }, []);

  return (
    <main className="activeSession">
      <div className="activeSession__focus">
        <div className="activeSession_setFocus">
          {isEditing ? (
            <input
              type="text"
              ref={inputRef}
              className="activeSession__focusInput"
              onChange={handleSetFocus}
              onBlur={handleBlur}
              value={focusSession}
              placeholder="Set a focus"
              maxLength="40"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleBlur();
              }}
            />
          ) : (
            <h1 className="activeSession__focusSession" onClick={handleClick}>
              {focusSession || "Set a focus"}
            </h1>
          )}
        </div>
      </div>
      <div className="activeSession__timerDisplay">
        <TimerDisplay minutes={minutes} seconds={seconds} />
        <TimerButtons
          input={input}
          setInput={setInput}
          buttonText={buttonText}
          timeEditable={timeEditable}
          handleStartStop={handleStartStop}
          handleClear={handleClear}
          skip={false}
        />
        <div className="activeSession__icons">
          <div className="activeSession__sessionCounter">
            <img src={flameIcon} alt="" className="activeSession__flameIcon" />
            <p> {sessions}</p>
          </div>
          {/* <div className="activeSession__toggle" id="theme">
            <img src={darkIcon} alt="" onClick={() => { }} />
          </div> */}
        </div>
      </div>
    </main>
  );
}

export default ActiveSession;
