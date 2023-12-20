import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input === '') {
      return;
    }
    const newMessage = {
      role: 'user',
      content: input
    };
    setMessages([...messages, newMessage]);
    setInput('');
    // ここでメッセージを送信し、応答を処理します
    // この部分は後で実装します
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with AI</h1>
      </header>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

