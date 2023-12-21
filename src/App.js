import React, { useState } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';
import Modal from './components/Modal';
import { fetchResponse } from './components/fetchResponse';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(true);

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

  const startChat = async () => {
    setShowModal(false); // モーダルウィンドウを閉じる

    // 多分したのconst消したらスタートは保存しないけど、送ることは出来ると思う。
    const startMessage = {
      role: 'user',
      content: 'スタート',
    };
    setMessages([...messages, startMessage]);

    const aiReply = await fetchResponse('スタート');
    if (aiReply) {
      const aiMessage = {
        role: 'assistant',
        content: aiReply,
      };
      setMessages(messages => [...messages, aiMessage]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with AI</h1>
      </header> 
      <Modal showModal={showModal} startChat={startChat} /> 
      <ChatWindow messages={messages} />
      <InputArea input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
}

export default App;
