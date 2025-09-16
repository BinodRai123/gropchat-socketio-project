const chatModel = require("../models/chat.model");

async function  chatController(req, res){
  const { userId, friendId } = req.body;

  let chat = await chatModel.findOne({
    members: { $all: [userId, friendId] },
  });

  if (!chat) {
    chat = await chatModel.create({ members: [userId, friendId] });
    return res.status(201).json({
      message: "chat created sucessfully",
      chat: chat,
    });
  }

  res.status(200).json(chat);
}

module.exports = {chatController};