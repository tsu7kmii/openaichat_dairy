import React from 'react';

const InputArea = ({ input, setInput, sendMessage }) => {
  return (
    <div className="input-area">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default InputArea;
