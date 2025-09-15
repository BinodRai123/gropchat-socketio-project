const OnlineUser = ({ userId }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Notify server this user is online
    socket.emit("goOnline", { userId });

    // Listen to online users list
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users.filter((id) => id !== userId)); // exclude yourself
    });

    return () => socket.off("onlineUsers");
  }, [userId]);

  const handleClick = (friendId) => {
    socket.emit("getChatId", { userId, friendId }, ({ chatId, friendId }) => {
      console.log("Selected chat:", chatId, "with friend:", friendId);
      // Now you can open chat UI using chatId and friendId
    });
  };

  return (
    <div>
      <h2>Online Friends:</h2>
      <ul>
        {onlineUsers.map((id) => (
          <li key={id} onClick={() => handleClick(id)}>
            {id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUser;
