import React from 'react';
import './InputArea.css'; // CSSファイルのインポート

const InputArea = ({ input, setInput, sendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // デフォルトのEnter挙動（改行）を防止
      sendMessage();
    }
  };

  return (
    <div className="input-area-container">
      <textarea
        className="input-area"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        rows="1"
        placeholder="Type your message here..."
      />
      <button className="send-button" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default InputArea;
