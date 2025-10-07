import { useState } from "react";
import "./TimerDisplay.scss";

function TimerDisplay({ minutes, seconds, setInput }) {
  const [isEditing, setIsEditing] = useState(false);
  const [rawDigits, setRawDigits] = useState("")

  function handleInput() {
    setIsEditing((prev) => !prev);
  }

  function handleInputChange(e) { 
    alert(e.target.value)
  }
  // return isEditing ? (
  //   <input className="timerDisplay__input" onChange={({target}) => setInput(target.value)} onBlur={() => (setIsEditing(false))} placeholder="10:00" autoFocus/>
  // ) : (
  //   <h1 className="timerDisplay__display" onClick={handleInput}>
  //     {minutes < 10 ? `0${minutes}` : minutes}:
  //     {seconds < 10 ? `0${seconds}` : seconds}
  //   </h1>
  // );

  return ( 
    <input type="text" onChange={handleInputChange}/>
  )


}

export default TimerDisplay;
