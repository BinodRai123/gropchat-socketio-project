import { useEffect, useRef, useState } from "react";
import socket from "../../utils/socket";
import { FiPhone, FiVideo, FiMoreVertical } from "react-icons/fi";

function ChatWindow({ chatId, friendName, userId, friendImage }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("join_chat", chatId);
    const handleAllMessages = (messages) => setMessages(messages);
    const handleReceiveMessage = (msg) => {
      if (msg.chatId === chatId) {
        setMessages((prev) => [...prev, msg]);
      }

      console.log(msg);
    };

    socket.on("all_messages", handleAllMessages);
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("all_messages", handleAllMessages);
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [chatId]);

  useEffect(() => {
    setMessages([]); // clearing chat messages when switching to new chat
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return console.warn("write something");
    }

    const newMessage = { chatId, senderId: userId, text };

    socket.emit("send_message", newMessage);
    setText("");
  };

  return (
    <section className="flex-1 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between py-2 px-4 border-b border-gray-800 bg-[#161b22]">
        <div className="flex items-center gap-3">
          <img
            src={friendImage}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-sm">{friendName}</p>
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
        <div className="flex gap-4 text-gray-400">
          <FiPhone className="cursor-pointer hover:text-white" />
          <FiVideo className="cursor-pointer hover:text-white" />
          <FiMoreVertical className="cursor-pointer hover:text-white" />
        </div>
      </header>


      {/* Messages */}
      <div className="flex flex-col h-[77.2vh] bg-[#0d1117]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <article
              key={index}
              className={`flex flex-col ${
                msg.senderId === userId ? "items-end" : "items-start"
              }`}
            >
              <p
                className={`px-4 py-2 rounded-lg text-sm ${
                  msg.senderId === userId ? "bg-blue-600" : "bg-[#161b22]"
                }`}
              >
                {msg.text}
              </p>
              <time className="text-xs text-gray-400 mt-1">{msg?.time}</time>
            </article>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>

      {/* Input */}
      <footer className="p-4 border-t border-gray-800 bg-[#161b22]">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-[#0d1117] px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
          />
          <button
            type="submit"
            className="bg-blue-600 rounded-full hover:bg-blue-700 transition"
          >
            <img src="./src/assets/send.svg" className="size-12 pl-1" alt="" />
          </button>
        </form>
      </footer>
    </section>
  );
}

export default ChatWindow;
