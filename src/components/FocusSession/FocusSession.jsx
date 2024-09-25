import React, { useState, useEffect, useRef } from "react";
import "./FocusSession.scss";

function FocusSession() {
  const [focus, setFocus] = useState("What's your focus for this session?");
  const [isEditable, setIsEditable] = useState(false);
  const focusRef = useRef(null);
  const hasCleared = useRef(false);

  function handleFocusEdit(e) {
    e.target.contentEditable = true;
    setIsEditable(true);
  }

  function handleBlur(e) {
    setIsEditable(false)
    e.target.contentEditable = false;

    if (e.target.innerHTML === "") {
      setFocus("What's focus for this session?")
    }
    
  }
  // useEffect(() => {
  //   if (isEditable) {
  //     const handleClickOutside = (e) => {
  //       if (focusRef.current && !focusRef.current.contains(e.target)) {
  //         setIsEditable(false);
  //       }
  //     };

  //     document.addEventListener("click", handleClickOutside);
  //     return () => document.removeEventListener("click", handleClickOutside);
  //   }
  // }, [isEditable]);

  // sets the focus to whatever the user inputs upon hitting enter; clears the focus before typing
  function handleSetFocus(e) {
    if (!hasCleared.current) {
      focusRef.current.innerText = "";
      hasCleared.current = true;
    }
    if (e.key === "Enter") {
      if (focusRef.current.value === "") {
        setFocus("What's your focus for this session?");
      } else {
        e.target.contentEditable = false;
        setFocus(e.target.innerHTML);
        setIsEditable(false);
      }
    }
  }
  return (
    <div className="focusSession">
      <h1
        ref={focusRef}
        className={`focusSession__focus ${isEditable ? "edit" : ""}`}
        onClick={handleFocusEdit}
        onKeyDown={handleSetFocus}
        onBlur={handleBlur}
      >
        {focus}
      </h1>
    </div>
  );
}

export default FocusSession;
