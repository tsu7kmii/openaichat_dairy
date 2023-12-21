import React, { useState } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';
import StartPopup from './components/StartPopup';
import { fetchResponse } from './components/fetchResponse';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  const handleStart = async () => {
    setShowPopup(false);
    setInput('start');
    await sendMessage();
    // Flaskにスタート信号を送るロジックをここに追加
  };

  const sendMessage = async () => {
    if (input === '') {
      return;
    }
    const userMessage = {
      role: 'user',
      content: input,
    };
    setMessages([...messages, userMessage]);

    const aiReply = await fetchResponse(input);
    if (aiReply) {
      const aiMessage = {
        role: 'assistant',
        content: aiReply,
      };
      setMessages(messages => [...messages, aiMessage]);
    }

    setInput('');
  };

  return (
    <div className="App">
      {showPopup && <StartPopup handleStart={handleStart} />}
      <header className="App-header">
        <h1>Chat with AI</h1>
      </header>
      <ChatWindow messages={messages} />
      <InputArea input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
}

export default App;
