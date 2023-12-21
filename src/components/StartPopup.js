import React from 'react';
import './StartPopup.css'; 

const StartPopup = ({ show, onStart }) => {
//   if (!show) {
//     return null; // show が false の場合は何も表示しない
//   }
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Chat Appへようこそ！</h2>
        <button onClick={onStart}>OK</button>
      </div>
    </div>
  );
};

export default StartPopup;
