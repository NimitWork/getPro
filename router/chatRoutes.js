const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
  chatAssign,
  checkChatAccess
} = require("../controllers/chatControllers");

const router = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
  
      const token = req.headers.authorization;
      console.log(token);
      const verifyTokenId = jwt.verify(token, "zxcvbnm");
      console.log(verifyTokenId);
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

router.route("/chat").post(protect, accessChat);
router.route("/chat").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/chatAssign").post(chatAssign);
router.route("/checkChatAccess").post(checkChatAccess);

module.exports = router;
