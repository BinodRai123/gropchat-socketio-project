const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    }
  });

  //socket-io middleware
  io.use( async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");

    if(!cookies.token){
      next(new Error("Authentication Error: no Token provided"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY);

      const user = await userModel.findOne({_id: decoded.id});
      socket.user = user;

      next();

    } catch (error) {
      next(new Error("Authentication Error: Invalid token"));
    }
  })


  io.on("connection", async (socket) => {
    console.log("A user connected:", socket.id);
    console.log(socket.user.userName)

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