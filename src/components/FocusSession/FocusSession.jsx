import React, { useEffect, useState } from "react";

function FocusSession() {
  const [focus, setFocus] = useState("What's your focus for this session?");

  function handleFocusChange(e) {
      e.target.contentEditable = true;
  }
    
    function handleSetFocus(e) {
        if (e.key === "Enter") {
            e.target.contentEditable = false;
            setFocus(e.target.innerHTML)
        }
    }
  return (
    <div>
      <h1 onClick={handleFocusChange} onChange={e => setFocus(e.target.value)} onKeyDown={handleSetFocus}>{focus}</h1>
      <button></button>
    </div>
  );
}

export default FocusSession;
