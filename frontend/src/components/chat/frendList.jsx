import { useState } from "react";
import axios from "../../utils/axios";
import ChatWindow from "./chatWindow";

const FrendList = ({ friends, userId }) => {
  const[activeChat, setActiveChat] = useState(null);
  const handleChatRoom = async (friendId, friendName) => {
    const chat = await axios.post("/api/chat", { friendId, userId });
    setActiveChat({ chatId: chat.data._id, friendName: friendName });
  };

  return (
    <div>
      <ul className="w-20 select-none">
        {friends.map((friend, id) => (
          <li
            key={id}
            className="bg-gray-500 px-5 py-2 cursor-pointer active:bg-gray-400"
            onClick={() => handleChatRoom(friend._id, friend.name)}
          >
            {friend.name}
          </li>
        ))}
      </ul>

      {activeChat && (
        <ChatWindow
          chatId={activeChat.chatId}
          friendName={activeChat.friendName}
          userId={userId}
        />
      )}
    </div>
  );
};

export default FrendList;
