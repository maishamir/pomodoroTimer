import React, { useState } from "react";
import ActiveSession from "./components/ActiveSession/ActiveSession";
import CompletionScreen from "./components/CompletionScreen/CompletionScreen";
import BreakScreen from "./components/BreakScreen/BreakScreen";
import "./App.scss";
import darkIcon from "./assets/darkFilled.png";
import lightIcon from "./assets/lightFilled.png";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import useLocalStorage from "use-local-storage";

function ThemeToggle({ isDark, setIsDark }) {
  const location = useLocation();

  if (location.pathname === "/complete") return null;
  return (
    <div className="App__toggle" id="theme">
      <img
        src={isDark ? lightIcon : darkIcon}
        alt=""
        onClick={() => setIsDark(!isDark)}
      />
    </div>
  );
}

function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  return (
    <BrowserRouter>
      <div className="App" data-theme={isDark ? "dark" : "light"}>
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route path="/" element={<ActiveSession />} />
          <Route path="complete" element={<CompletionScreen />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="active" element={<Navigate to="/" />} />
          <Route path="break" element={<BreakScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
