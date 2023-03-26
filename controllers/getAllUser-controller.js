const User = require("../model/user");


module.exports.getAllUser = async (req, res) => {
    try {
     const AllUser=await User.find()
     res.status(200).json({message:AllUser})
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  