import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, push, onValue } from 'firebase/database';

// Login Component
function Login({ onLogin }) {
  const [you, setYou] = useState('');
  const [friend, setFriend] = useState('');

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
      <h2>👋 Welcome to PingMe</h2>
      <input
        type="text"
        placeholder="Your nickname"
        value={you}
        onChange={(e) => setYou(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: 8, width: '100%' }}
      />
      <input
        type="text"
        placeholder="Friend's nickname"
        value={friend}
        onChange={(e) => setFriend(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: 8, width: '100%' }}
      />
      <button
        onClick={() => you && friend && onLogin(you, friend)}
        style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 5 }}
      >
        Start Chat
      </button>
    </div>
  );
}

// Chat Component
function Chat({ userName, friendName }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const chatId = [userName, friendName].sort().join('_');
  const chatRef = ref(db, `chats/${chatId}`);

  useEffect(() => {
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val() || {};
      const msgs = Object.values(data);
      setMessages(msgs);
      console.log('Loaded messages:', msgs);
    });
    return () => unsubscribe();
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    const msg = {
      sender: userName,
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    push(chatRef, msg);
    console.log('Sent:', msg);
    setMessage('');
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", marginTop: 50, padding: 20, borderRadius: 10, background: "#fff", boxShadow: "0 0 10px #ccc" }}>
      <h2 style={{ textAlign: 'center' }}>PingMe 💬</h2>
      <h4>Chatting with <span style={{ color: '#007bff' }}>{friendName}</span></h4>

      <div style={{ minHeight: 300, margin: "20px 0", padding: 10, background: "#f9f9f9", borderRadius: 5, maxHeight: 300, overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong style={{ color: msg.sender === userName ? 'blue' : 'green' }}>
              {msg.sender}:
            </strong> {msg.text}
            <span style={{ fontSize: 12, color: '#aaa' }}> ({msg.timestamp})</span>
          </p>
        ))}
      </div>

      <input
        type="text"
        value={message}
        placeholder="Type your message..."
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "70%", padding: 8 }}
      />
      <button
        onClick={handleSend}
        style={{ padding: "8px 16px", marginLeft: 10, background: "#007bff", color: "#fff", border: "none", borderRadius: 5 }}
      >
        Send
      </button>
    </div>
  );
}

// App Wrapper
function App() {
  const [userName, setUserName] = useState('');
  const [friendName, setFriendName] = useState('');

  if (!userName || !friendName) {
    return <Login onLogin={(you, friend) => {
      setUserName(you);
      setFriendName(friend);
    }} />;
  }

  return <Chat userName={userName} friendName={friendName} />;
}

export default App;
