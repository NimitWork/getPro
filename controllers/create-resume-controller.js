const User = require("../model/user");
const jwt = require("jsonwebtoken");
const CreateCv = require("../model/createCv");

module.exports.CreateResume = async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    console.log(req.body);
    const verifyTokenId = jwt.verify(token, "zxcvbnm");
    const UserDetails = await User.findById(verifyTokenId.userId);
    const resumeHeadline = req.body.resumeHeadline;
    const employer = req.body.employer;
    const education = req.body.education;
    const tableData = req.body.tableData;
    const project = req.body.project;
    const desired = req.body.desired;
    const personal = req.body.personal;
    const obj = {
      email: UserDetails.email,
      resumeHeadline: resumeHeadline,
      employer: employer,
      education: education,
      tableData: tableData,
      project: project,
      desired: desired,
      personal: personal,
    };
    const CvData = new CreateCv(obj);
    await CvData.save();
    res.status(200).json({ message: "Resume Successfully Created" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.FindResume = async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const verifyTokenId = jwt.verify(token, "zxcvbnm");
    const UserDetails = await User.findById(verifyTokenId.userId);
    console.log("qwertyuiop", UserDetails._id);
    const findCv = await CreateCv.find({ email: UserDetails.email });
    res.status(200).json({ message: findCv });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.FindUserResume = async (req, res) => {
  try {
    console.log("qwetyuioiuytrew", req.params.id);
    const UserDetails = await User.findById(req.params.id);
    console.log("qwertyuiop", UserDetails._id);
    const findCv = await CreateCv.find({ email: UserDetails.email });
    res.status(200).json({ message: findCv });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
