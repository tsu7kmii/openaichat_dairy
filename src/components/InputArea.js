import React, { useEffect, useRef } from 'react';
import './InputArea.css';

const InputArea = ({ input, setInput, sendMessage }) => {
  const textAreaRef = useRef(null);

  const adjustHeight = () => {
    const textArea = textAreaRef.current;
    textArea.style.height = 'auto'; // 高さをリセット
    textArea.style.height = `${Math.min(textArea.scrollHeight, 120)}px`; // スクロール高さか最大高さの小さい方に設定
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    adjustHeight(); // コンポーネントが更新されるたびに高さを調整
  }, [input]); // inputが変更されるたびに実行

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
        onKeyDown={handleKeyPress}
        rows="1"
        placeholder="Type your message here..."
      />
      <button className="send-button" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default InputArea;
