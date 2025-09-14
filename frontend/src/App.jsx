import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("chatMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off("chatMessage");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && username.trim()) {
      socket.emit("chatMessage", { user: username, text: message });
      setMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-4 flex flex-col">
        <h2 className="text-xl font-semibold text-center mb-4">Chat App</h2>

        {/* Username Input */}
        {!username && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") setUsername(e.target.value);
              }}
            />
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto border rounded-md p-2 mb-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-md my-1 ${
                msg.user === username
                  ? "bg-blue-500 text-white self-end text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
