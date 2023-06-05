const asyncHandler = require("express-async-handler");
const Message = require("../model/messageModel");
const User = require("../model/user");
const Chat = require("../model/chatModel");

const TriggerNotification = require("../configs/triggerNotification");
const ejs = require('ejs');
const order = require("../model/order");

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
  console.log("fileeeee", req.files, req.user);
  const { content, chatId, type, name } = req.body;


  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
    type: type,
    name: name,
    datetime: new Date().toLocaleString()
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


    const getChat = await Chat.findById(req.body.chatId);
    console.log("");
    let order_id = null;
    let getUser = null;
    if (getChat && getChat.orderId) {
      let getOrder = await order.findById(getChat.orderId);
      if (getOrder && getOrder.order_id) {
        order_id = getOrder.order_id;
      }
    }

    let cc = '';
    if (req.user.type === 'user') {

      // SEND EMAIL TO ADMIN
      let subject = `Reply on Order ID  ${order_id}`;
      emailContent = `<div style="width:100%;padding:14px;margin: auto;text-align:left">
      <h2 style="margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#0B5394"><strong>Hi Admin,</strong></h2>
      <p style="display:block;box-sizing:border-box;">
      You have received a reply on Order ID ${order_id}. Please revert back as soon as possible.
      Reply message: ${content}
      </p>
      <br>
      <a href="https://getprowriter.com:5000/chats" class="es-button" target="_blank" style="font-family:arial, helvetica, sans-serif;font-size:16px;text-decoration:none;mso-style-priority:100 !important;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF; padding: 10px; border-style:solid;border-color:#049899;border-width:0px 15px;display:inline-block;background:#049899;border-radius:4px;font-weight:bold;font-style:normal;line-height:19px;width:auto;text-align:center">Order ${order_id}</a>
      </div>`;
      let adminRegisterTemplate = await ejs.renderFile(__dirname + '/../configs/email_template.html', emailContent);
      await TriggerNotification.triggerEMAIL(process.env.ADMIN_EMAIL, cc, subject, null, adminRegisterTemplate);
      res.json(message);

    } else if (req.user.type == 'admin') {

      if (!getChat.user && getChat.users.length !== 2 && !getChat.users[0]) {
        res.json(message);
      } else {

        getUser = await User.findById(getChat.users[0]);
        console.log("LB-90", getUser);

        if (getUser.email) {
          // SEND EMAIL TO USer
          let subject = `Reply on Order ID  ${order_id}`;
          emailContent = `<div style="width:100%;padding:14px;margin: auto;text-align:left">
          <h2 style="margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#0B5394"><strong>Hi ${getUser.username},</strong></h2>
          <p style="display:block;box-sizing:border-box;">
          You have received a reply on Order ID ${order_id}. Please revert back as soon as possible.
          Reply message: ${content}
          </p>
          <br>
          <a href="https://getprowriter.com/dashboard" class="es-button" target="_blank" style="font-family:arial, helvetica, sans-serif;font-size:16px;text-decoration:none;mso-style-priority:100 !important;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF; padding: 10px; border-style:solid;border-color:#049899;border-width:0px 15px;display:inline-block;background:#049899;border-radius:4px;font-weight:bold;font-style:normal;line-height:19px;width:auto;text-align:center">Question  ${order_id}</a></span>
          </div>
          </div>`;
          let emailTemplate = await ejs.renderFile(__dirname + '/../configs/email_template.html', emailContent);
          await TriggerNotification.triggerEMAIL(getUser.email, cc, subject, null, emailTemplate);
          res.json(message);
        } else {
          res.json(message);
        }
      }

    }

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
