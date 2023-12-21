import React from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <p key={index}>{msg.content}</p>
      ))}
    </div>
  );
};

export default ChatWindow;
