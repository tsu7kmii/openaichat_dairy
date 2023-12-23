import React from 'react';
import './Modal.css'; // スタイルを適用するためのCSSファイル

const Modal = ({ showModal,startChat }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>これから始めます。いいですか？</h2>
        <button onClick={startChat}>OK Start</button>
      </div>
    </div>
  );
};

export default Modal;
