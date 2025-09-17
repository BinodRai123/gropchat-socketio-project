import { useEffect, useRef, useState } from "react";
import socket from "../../utils/socket";

function ChatWindow({ chatId, friendName, userId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("join_chat", chatId);

    socket.on("all_messages", (messages) => {
      setMessages(messages);
    });

    socket.on("receive_message", (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return console.warn("write something");
    }
    socket.emit("send_message", { chatId, senderId: userId, text });
    setMessages;
    setText("");
  };

  return (
    <div>
      <h2 className="font-bold">Chat with {friendName}</h2>
      <ul className="h-64 overflow-y-auto border my-2 p-2 ">
        {messages.map((message, id) => (
          <div
            key={id}
            className={`flex mb-2 ${
              message.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`w-fit max-w-xs px-4 py-2 rounded-2xl ${
                message.senderId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              <span className="block font-semibold">
                {message.senderId === userId ? "Me" : friendName}
              </span>
              {message.text}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          className="border flex-grow p-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-3 ml-2">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
