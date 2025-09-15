import { useRef } from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();

    socket.on("chatMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("chatMessage");
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim())
      socket.emit("chatMessage", { user: userName, text: inputText });
    setInputText("");
  };

  return (
    <>
      <div className="max-w-5xl mx-auto flex flex-col h-screen bg-gray-100">
        {/* Header */}
        <div className="p-4 bg-blue-600 text-white font-bold">
          Chat with User
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg, id) => (
            <div
              key={id}
              className={`flex ${
                msg.user === userName ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`text-xl px-4 py-2 rounded-2xl max-w-xs break-words
                ${
                  msg.user === userName
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-300 text-black rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white flex items-center gap-2 border-t"
        >
          <input
            type="text"
            ref={inputRef}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
