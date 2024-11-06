import { useState, useEffect, useRef } from "react";
import "./ActiveSession.scss";
// import InputForm from "../InputForm/InputForm";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import useTimer from "../../hooks/useTimer";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import TimerButtons from "../TimerButtons/TimerButtons";


function ActiveSession() {

  let navigate = useNavigate();
  const [input, setInput] = useState();

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
      const delay = setTimeout(() => {
        navigate("/complete")
      }, 2800);

      return () => clearTimeout(delay);
    }
  }, [minutes, seconds]);


  return (
    <main className="app">
      <div className="app__focus">
        <p
          className={`app__editIcon ${
            isEditing ? "app__editIcon--active" : ""
            }`}
          style={{ opacity: isEditing && 1 }}
        >
          <EditIcon fontSize="medium" />
        </p>

        <div className="app_setFocus">
          {isEditing ? (
            <input
              type="text"
              placeholder={focusSession === "" ? "Click to set a focus" : ""}
              ref={inputRef}
              className="app__focusInput"
              onChange={handleSetFocus}
              onBlur={handleBlur}
              value={focusSession}
              maxLength="40"
              onKeyDown={(e) => { if (e.key === "Enter") handleBlur() }}
            />
          ) : (
            <h1 className="app__focusSession" onClick={handleClick} >
              {focusSession || "Click to set a focus"}
            </h1>
          )}
        </div>
      </div>
      <div className="app__timerDisplay">
        <TimerDisplay minutes={minutes} seconds={seconds} />
        {/* <InputForm
          input={input}
          setInput={setInput}
          buttonText={buttonText}
          timeEditable={timeEditable}
          handleStartStop={handleStartStop}
          handleClear={handleClear}
        /> */}
        <TimerButtons input={input}
          setInput={setInput}
          buttonText={buttonText}
          timeEditable={timeEditable}
          handleStartStop={handleStartStop}
          handleClear={handleClear} 
          skip={false}
          />
          
      </div>
    </main>
  );
}

export default ActiveSession;
