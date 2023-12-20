import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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

async function fetchResponse(userInput) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();
    if (data && data.reply) {
      return data.reply;
    }
  } catch (error) {
    console.error('Error fetching response:', error);
  }
  return '';
}

export default App;

