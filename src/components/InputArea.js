import React, { useEffect, useRef } from 'react';
import './InputArea.css';
import { IoIosSend } from "react-icons/io";

const InputArea = ({ input, setInput, sendMessage, isLoading, disabled }) => {
  const textAreaRef = useRef(null);

  const adjustHeight = () => {
    const textArea = textAreaRef.current;
    textArea.style.height = 'auto'; 
    textArea.style.height = `${Math.min(textArea.scrollHeight, 120)}px`; 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    adjustHeight(); 
    if (!isLoading) {
      textAreaRef.current.focus(); // ローディングが終わったら入力欄にフォーカス
    }
  }, [input, isLoading, disabled]); // input または isLoading が変更されたときに実行

  return (
    <div className="input-area-container">
      <textarea
        ref={textAreaRef}
        className="input-area"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          adjustHeight();
        }}
        disabled={isLoading || disabled}
        onKeyDown={handleKeyPress}
        rows="1"
        placeholder="Type your message here..."
      />
      <button className="send-button" onClick={sendMessage} disabled={isLoading || disabled}>
        <IoIosSend />
      </button>
    </div>
  );
};

export default InputArea;
