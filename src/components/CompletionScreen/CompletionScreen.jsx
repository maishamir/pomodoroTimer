import React, { useEffect, useState } from "react";
import "./CompletionScreen.scss";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import clockIcon from "../../assets/alarm-clock.svg";
import teaCupIcon from "../../assets/tea-cup.svg";
import sunshineIcon from "../../assets/sunshine.svg";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import lottieConfetti from "../../assets/lottieConfetti.json";

function CompletionScreen() {
  let navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: lottieConfetti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="completionScreen">
      <div className="completionScreen__confetti">
        <Lottie
          options={defaultOptions}
          height={700}
          width={700}
          isStopped={!showConfetti}
          isClickToPauseDisabled={true}
        />
      </div>
      <div className="completionScreen__content">
        <h1 className="completionScreen__title">Great job!</h1>

        <div className="completionScreen__choices">
          <h2 className="completionScreen__subtitle">What's next?</h2>
          <div className="completionScreen__buttons">
            <button
              className="completionScreen__button"
              onClick={() => navigate("/break")}
            >
              <img src={teaCupIcon} alt="" className="completionScreen__icon" />
            </button>

            <button
              className="completionScreen__button"
              onClick={() => navigate("/active")}
            >
              <img src={clockIcon} alt="" className="completionScreen__icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletionScreen;
