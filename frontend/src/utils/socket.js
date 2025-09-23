import { io } from "socket.io-client";

const socket = io("https://gropchat-socketio-project.onrender.com", {
  withCredentials: true,
});

export default socket;