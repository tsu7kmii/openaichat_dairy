import React, { useEffect, useRef } from 'react';
import { FaUserGear } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

const ChatWindow = ({ messages }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index}>
          {
            msg.role === 'Assistant' ? 
            <FaUserGear /> : 
            msg.role === 'User' ? 
            <FaUserEdit /> : 
            null
          }
          <strong> {msg.role}</strong>
          <br />
          {msg.content.split('\n').map((line, lineIndex) => (
            <p key={lineIndex}style={{ marginLeft: '20px' }}>{line}</p>
          ))}
          <br />
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;
