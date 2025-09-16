import { useState } from "react";
import axios from "../../utils/axios";
import ChatWindow from "./chatWindow";

function FriendList({ friends , userId }) {
  const [activeChat, setActiveChat] = useState(null);

  const startChat = async (friendId, friendName) => {
    const res = await axios.post("/api/chat",{ userId, friendId }, {Credential: true});
    const chat = res;
    setActiveChat({ chatId: chat.data._id, friendName, friendId });
  };

  return (
    <div className="flex">
      <div className="w-1/3 border-r">
        {friends.map((friend,id) => (
          <div key={id} className="p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => startChat(friend._id, friend.name)}>
            {friend.name}
          </div>
        ))}
      </div>

      <div className="w-2/3">
        {activeChat && (
          <ChatWindow
            chatId={activeChat.chatId}
            friendName={activeChat.friendName}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}

export default FriendList;
