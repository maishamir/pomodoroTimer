// import React from "react";
// import "./InputForm.scss";
// import restartIcon from "../../assets/restart.svg"

// function InputForm({
//   input,
//   setInput,
//   buttonText,
//   timeEditable,
//   handleStartStop,
//   handleClear,
// }) {
//   return (
//     <form onSubmit={handleStartStop} className="inputForm">
//       <input
//         type="number"
//         placeholder="mins"
//         value={input}
//         onChange={({target}) => setInput(target.value)}
//         disabled={timeEditable ? false : true}
//         className="inputForm__input"
//       />
//       <div className="inputForm__buttons">
//         <button type="submit" className="inputForm__button">
//           {buttonText}
//         </button>
//         <img src={restartIcon} onClick={handleClear} alt="" className="inputForm__icon" />
//       </div>
//     </form>
//   );
// }

// export default InputForm;
