import { useState } from "react";
import axios from "../../utils/axios";
import ChatWindow from "./chatWindow";
import { FiSearch } from "react-icons/fi";

const FrendList = ({ friends, userId }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [searcText, setSearcText] = useState("");
  const copyFriend = friends;

  const filteredFriends = copyFriend.filter((friend) =>
    friend.name.toLowerCase().includes(searcText.toLowerCase())
  );

  const handleChatRoom = async (friendId, friendName, image) => {
    const chat = await axios.post("/api/chat", { friendId, userId });
    setActiveChat({
      chatId: chat.data._id,
      friendId,
      friendName: friendName,
      friendImage: image,
    });
  };





  return (
    <div className="flex w-full">
      <aside className=" md:flex w-72 flex-col border-r border-gray-800 bg-[#161b22]">
        <header className="p-4 font-semibold text-lg border-b border-gray-800">
          Chats
        </header>

        {/* Search */}
        <div className="p-3">
          <div className="flex items-center bg-[#0d1117] rounded-md px-3">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              value={searcText}
              placeholder="Search"
              className="w-full bg-transparent py-2 text-sm focus:outline-none"
              onChange={(e) => setSearcText(e.target.value)}
            />
          </div>
        </div>

        {/* Friend List */}
        <nav className="flex-1 items-center overflow-y-auto">
          <ul>
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend, id) => (
                <li
                  key={id}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer 
                ${
                  activeChat?.friendName === friend.name
                    ? "bg-blue-900" // highlighted style
                    : "bg-[#1d232a] hover:bg-[#20262d]"
                }`}
                  onClick={() =>
                    handleChatRoom(friend._id, friend.name, friend.profileImage)
                  }
                >
                  <img
                    src={friend?.profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{friend.name}</p>
                    <span className="text-xs text-green-400">online</span>
                  </div>
                  <time className="text-xs text-gray-400">{friend.time}</time>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-center">No friends found</li>
            )}
          </ul>
        </nav>
      </aside>

      {activeChat && (
        <ChatWindow
          chatId={activeChat.chatId}
          friendName={activeChat.friendName}
          userId={userId}
          friendImage={activeChat.friendImage}
        />
      )}
    </div>
  );
};

export default FrendList;
