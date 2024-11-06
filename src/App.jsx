import React, { useState } from "react";
import ActiveSession from "./components/ActiveSession/ActiveSession";
import CompletionScreen from "./components/CompletionScreen/CompletionScreen";
import BreakScreen from "./components/BreakScreen/BreakScreen";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ActiveSession />} />
        <Route path="complete" element={<CompletionScreen />} />
        <Route path="home" element = {<Navigate to ="/"/>} />
        <Route path="active" element={<Navigate to="/" />} />
        <Route path="break" element={<BreakScreen/>} />

      </Routes>
    </BrowserRouter>  
  )
}

export default App;
