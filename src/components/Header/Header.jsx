import React, { useState, useRef } from "react";

function Header({ status }) {
  console.log(`status => ${status}`);
  const [focusSession, setFocusSession] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  function handleBlur(e) {
    if (e.type === "keydown" && e.key !== "Enter")  return;
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

  function headerContent(status) {
    switch (status) {
      case "complete":
        return (
          <div>
            <h1 className="completionScreen__title">Great job!</h1>
            <h2>What's next?</h2>
          </div>
        );
      case "break":
        return <h1 className="breakScreen__title">Break</h1>;
      default:
        return (
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
                onKeyDown={handleBlur}
              />
            ) : (
              <h1 className="app__focusSession" onClick={handleClick}>
                {focusSession || "Click to set a focus"}
              </h1>
            )}
          </div>
        );
    }
  }

  return headerContent(status);
}

export default Header;
