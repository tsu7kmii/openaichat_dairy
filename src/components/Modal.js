import React from 'react';
import './Modal.css';
import { FaArrowCircleRight } from "react-icons/fa";

const Modal = ({ showModal,startChat }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>これから始めます。いいですか？</h2>
        <p>もし、➡を押してもAssistantから返答がない場合、ご不便をおかけしますがサイトのリロードをお願い致します。</p>
        <button className="start-chat"onClick={startChat}>
          <FaArrowCircleRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
