import { useContext } from "react";
import { context } from "../wrapper";
import FriendList from "../components/chat/frendList";
import { useState, useEffect } from "react";

import socket from "../utils/socket";

const Chat = () => {
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [user, setUser] = useContext(context);
  useEffect(() => {
    const handleOnlineUsers = (friends) => {
      const friendsOnly = friends.filter(
        (friend) => friend._id !== String(user)
      );
      console.log(friendsOnly)
      setOnlineFriends(friendsOnly);
    };
    

    socket.on("online_users", handleOnlineUsers);

    return () => {
      socket.off("online_users", handleOnlineUsers);
    };
  }, [user]);


  return (
    <>
      <div className="flex min-h-screen bg-[#0d1117] text-white">
        <FriendList friends={onlineFriends} userId={String(user)} />
      </div>
    </>
  );
};

export default Chat;
