const { Server } = require("socket.io");
const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

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

      const user = await userModel.findOne({_id: decoded.id}).select("-password -__v");
      socket.user = user;

      next();

    } catch (error) {
      next(new Error("Authentication Error: Invalid token"));
    }
  })

  io.on("connection", async (socket) => {
    console.log("A user connected:", socket.id);

    /* --Join Room of two user-- */
    socket.on("join_chat",(chatId) => {
      socket.join(chatId);
      console.log(`user ${socket.user.userName} joined chat ${chatId}`);
    })

    /* --send message to chat-- */
    socket.on("send_message", async({chatId, senderId, text}) => {
      const message = await messageModel.create({senderId, chatId, text});
      io.to(chatId).emit("receive message", message);
    })

    

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}

module.exports = initSocketServer;