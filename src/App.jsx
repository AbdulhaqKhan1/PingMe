import { useState, useEffect } from "react";
import "./PingMe.css";

const users = ["YoungKheed", "Friend001"];

export default function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [selectedFriend, setSelectedFriend] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState({});

  useEffect(() => {
    document.title = "PingMe";
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    const chatKey = [currentUser, selectedFriend].sort().join("_");
    const newMsg = {
      sender: currentUser,
      text: message.trim(),
      time: new Date().toLocaleTimeString(),
    };

    setChats((prev) => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), newMsg],
    }));

    setMessage("");
  };

  const currentChatKey =
    currentUser && selectedFriend
      ? [currentUser, selectedFriend].sort().join("_")
      : null;

  return (
    <div className="app-container">
      <h1>PingMe 💬</h1>

      {!currentUser ? (
        <>
          <h2>Select your username</h2>
          {users.map((u) => (
            <button key={u} onClick={() => setCurrentUser(u)}>
              {u}
            </button>
          ))}
        </>
      ) : !selectedFriend ? (
        <>
          <h2>Hello {currentUser} 👋</h2>
          <p>Select a friend to chat with:</p>
          {users
            .filter((u) => u !== currentUser)
            .map((f) => (
              <button key={f} onClick={() => setSelectedFriend(f)}>
                {f}
              </button>
            ))}
        </>
      ) : (
        <>
          <h2>Chatting with {selectedFriend}</h2>
          <div className="chat-box">
            {(chats[currentChatKey] || []).map((msg, index) => (
              <div key={index} className="chat-message">
                <strong>{msg.sender}:</strong> {msg.text}{" "}
                <time>({msg.time})</time>
              </div>
            ))}
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </>
      )}
    </div>
  );
}
