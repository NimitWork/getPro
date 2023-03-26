const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ip = require("ip");
const axios = require("axios");


module.exports.login = async (req, res) => {
  try {
    const usernameData = await User.findOne({ username: req.body.username });
    console.log(req.body);

    if (usernameData == null) {
      res.status(404).json({
        message: "your account does not found",
      });
    } else {
      let bcryptMatchPassword = await bcrypt.compare(
        req.body.password,
        usernameData.password
      );
      if (bcryptMatchPassword === true) {
        if(usernameData.accountType===req.body.accountType || usernameData.accountType==="admin"){
          let userId = usernameData._id;
          var token = jwt.sign({ userId }, "zxcvbnm");
          res.status(200).json({
            message: "successfully login",
            token: token,
            loginType:usernameData.accountType
          });
        }else{
          res.status(404).json({
            message: "please select right account type",
          });
        }
      
      } else {
        res.status(404).json({
          message: "your password is incorrect",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
