import React, { useState } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';
import Modal from './components/Modal';
import { fetchResponse } from './components/fetchResponse';
import { Puff }  from 'react-loader-spinner'; 

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (input === ''|| isLoading) {
      return;
    }
    setIsLoading(true);
    const userMessage = {
      role: 'User',
      content: input,
    };
    setMessages([...messages, userMessage]);

    const aiReply = await fetchResponse(input);
    if (aiReply) {
      const aiMessage = {
        role: 'Assistant',
        content: aiReply,
      };
      setMessages(messages => [...messages, aiMessage]);
    }

    setInput('');
    setIsLoading(false);
  };

  const startChat = async () => {
    setShowModal(false); // モーダルウィンドウを閉じる
    setIsLoading(true);

    const aiReply = await fetchResponse('22nknubr4tsdf9');
    if (aiReply) {
      const aiMessage = {
        role: 'Assistant',
        content: aiReply,
      };
      setMessages(messages => [...messages, aiMessage]);
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Support your life</h3>
      </header> 
      <Modal showModal={showModal} startChat={startChat} /> 
      <ChatWindow messages={messages} />
      <InputArea input={input} setInput={setInput} sendMessage={sendMessage} isLoading={isLoading}disabled={showModal}/>
      {isLoading && (
        <div className={`loader-backdrop ${isLoading ? '' : 'hidden'}`}>
        <Puff type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      )}
    </div>
  );
}

export default App;
