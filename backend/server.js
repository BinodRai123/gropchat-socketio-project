const app = require("./src/app");
const { Server } = require("socket.io");
const {createServer} = require("http")
const{ instrument } = require("@socket.io/admin-ui");

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3030", "http://localhost:5173"],
      credentials: true
    }
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

httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
