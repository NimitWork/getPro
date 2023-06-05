const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");

const User = require("../model/user");
const jwt = require("jsonwebtoken");


const router = express.Router();

const protect = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
     
      const verifyTokenId = jwt.verify(token, "zxcvbnm");
    
      const UserDetails = await User.findById(verifyTokenId.userId);
      req.user = UserDetails;
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized,  token Failed" });
  }
};

router
  .route("/message/:chatId")
  .get(protect, allMessages);
router
  .route("/message")
  .post(protect ,sendMessage);

module.exports = router;
