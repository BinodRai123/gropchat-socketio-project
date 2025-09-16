import { useContext } from "react";
import { context } from "../wrapper";
import FriendList from "../components/chat/frendList";
import { useState, useEffect } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const Chat = () => {
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [user, setUser] = useContext(context);
  useEffect(() => {
    socket.on("online_users", (friends) => {
      const friendsOnly = friends.filter(
        (friend) => friend._id != String(user)
      );
      setOnlineFriends(friendsOnly);
    });
  });

  return (
    <>
      <FriendList friends={onlineFriends} userId={String(user)}/>
    </>
  );
};

export default Chat;
