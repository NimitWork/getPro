const asyncHandler = require("express-async-handler");
const Message = require("../model/messageModel");
const User = require("../model/user");
const Chat = require("../model/chatModel");


const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username email type")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const sendMessage = asyncHandler(async (req, res) => {
  console.log("fileeeee",req.files)
  const { content, chatId , type, name} = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
    type:type,
    name:name,
    datetime:new Date().toLocaleString()
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "username email type");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email", 
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage};
