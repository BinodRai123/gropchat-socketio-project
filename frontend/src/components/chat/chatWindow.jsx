import { useEffect, useState } from "react";
import socket from "../../utils/socket";

function ChatWindow({ chatId, friendName, userId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("join_chat", chatId);

    socket.on("receive_message", (msg) => {
      if (msg.chatId === chatId) {
        setMessages(prev => [...prev, msg]);
      }
    });

    socket.on("all_messages",(messages) => {
        setMessages(messages)
    })

    return () => {
      socket.off("receive_message");
    };
  }, [chatId]);

  const sendMessage = () => {
    if(!text.trim()){
        return console.warn("write something");
    }
    socket.emit("send_message", { chatId, senderId: userId, text });
    setText("");
  };

  return (
    <div>
      <h2 className="font-bold">Chat with {friendName}</h2>
      <div className="h-64 overflow-y-auto border my-2 p-2 ">
        {messages.map((message, i) => (
          <p key={i}><b>{message.senderId === userId ? "Me" : friendName}:</b> {message.text}</p>
        ))}
      </div>
      <div className="flex">
        <input
          className="border flex-grow p-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-3 ml-2">Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
