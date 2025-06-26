import React, { useEffect, useState, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { Box, Typography, Paper } from '@mui/material';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const username = localStorage.getItem('username') || 'User' + Math.floor(Math.random() * 1000);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/public', (message) => {
        const body = JSON.parse(message.body);
        setMessages((prev) => [...prev, body]);
      });

      stompClient.send('/app/chat.addUser', {}, JSON.stringify({ sender: username }));
    });

    setClient(stompClient);
    return () => stompClient.disconnect();
  }, [username]);

  const handleSendMessage = (text) => {
    if (client && client.connected) {
      client.send('/app/chat.sendMessage', {}, JSON.stringify({
        sender: username,
        content: text,
        type: 'CHAT'
      }));
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Live Chat</Typography>
      <Paper elevation={3} sx={{ p: 2, height: '60vh', overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} self={msg.sender === username} />
        ))}
        <div ref={chatEndRef} />
      </Paper>
      <MessageInput onSend={handleSendMessage} />
    </Box>
  );
};

export default ChatRoom;
