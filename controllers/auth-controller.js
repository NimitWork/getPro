const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");


module.exports.CheckLogin = async (req, res) => {
  
 
 
  // if(req.headers.authorization){
  //   const token = req.headers.authorization;
  //   console.log(token)
  //   const verifyTokenId = jwt.verify(token, "zxcvbnm");
  //   const UserDetails = await User.findById(verifyTokenId.userId);
  //   res.status(200).json({message:UserDetails})
  // }else{
  //   res.status(200).json({message:"please send token"})
  // }
 

};



