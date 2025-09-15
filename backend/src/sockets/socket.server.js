const { Server } = require("socket.io");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: "http://localhost:5173",
  });

  //use for admin ui
  // instrument(io, {
  //   auth: false,
  //   mode: "development",
  // });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // listen for chat messages
    socket.on("chatMessage", (msg) => {
      console.log("Message:", msg);

      // broadcast to all clients
      io.emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}

module.exports = initSocketServer;