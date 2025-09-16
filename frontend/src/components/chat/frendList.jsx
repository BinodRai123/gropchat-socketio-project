import { useState } from "react";
import axios from "../../utils/axios";

function FriendList({ friends , userId }) {
  const [activeChat, setActiveChat] = useState(null);

  const startChat = async (friendId, friendName) => {
    const res = await axios.get("/api/chat",{ userId, friendId }, {Credential: true});
    console.log(res);
    const chat = await res.json();
    setActiveChat({ chatId: chat._id, friendName, friendId });
  };

  return (
    <div className="flex">
      <div className="w-1/3 border-r">
        {/* {friends.map(f => (
          <div key={f.id} className="p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => startChat(f.id, f.name)}>
            {f.name}
          </div>
        ))} */}
      </div>

      <div className="w-2/3">
        {/* {activeChat && (
          <ChatWindow
            chatId={activeChat.chatId}
            friendName={activeChat.friendName}
            userId={userId}
          />
        )} */}
      </div>
    </div>
  );
}

export default FriendList;
