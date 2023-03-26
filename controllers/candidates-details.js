const User = require("../model/user");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("ffffff", file);
    callback(null, "./public/image");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + Date.now() + file.originalname);
  },
});

module.exports.upload = multer({ storage: Storage });

module.exports.InsertCandidateDetails = async (req, res) => {
  try {
    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", req.body);
    const token = req.headers.authorization;
    console.log("token", token);
    if (token && req.body) {
      const verifyTokenId = jwt.verify(token, "zxcvbnm");
      const UserDetails = await User.findById(verifyTokenId.userId);

      // console.log(UserDetails);
      const websiteUrl = req.body.websiteUrl;
      const qualification = req.body.qualification;
      const language = req.body.language;
      const jobCategory = req.body.jobCategory;
      const experience = req.body.experience;
      const currentSalary = req.body.currentSalary;
      const expectedSalary = req.body.expectedSalary;
      const age = req.body.age;
      const country = req.body.country;
      const city = req.body.city;
      const pincode = req.body.pincode;
      const address = req.body.address;
      const description = req.body.description;
      const facebook = req.body.facebook;
      const linkedin = req.body.linkedin;
      const twitter = req.body.twitter;
      if (UserDetails.accountType === "candidate") {
        if (req.file) {
          const userData = await User.findByIdAndUpdate(UserDetails._id, {
            websiteUrl: websiteUrl,
            qualification: qualification,
            language: language,
            jobCategory: jobCategory,
            experience: experience,
            currentSalary: currentSalary,
            expectedSalary: expectedSalary,
            age: age,
            country: country,
            city: city,
            pincode: pincode,
            address: address,
            description: description,
            facebook: facebook,
            linkedin: linkedin,
            twitter: twitter,
            profileStatus: "complete",
            image: req.file.filename,
          });
          res.status(200).json({ message: "successfuly created user details" });
        } else {
          const userData = await User.findByIdAndUpdate(UserDetails._id, {
            websiteUrl: websiteUrl,
            qualification: qualification,
            language: language,
            jobCategory: jobCategory,
            experience: experience,
            currentSalary: currentSalary,
            expectedSalary: expectedSalary,
            age: age,
            country: country,
            city: city,
            pincode: pincode,
            address: address,
            description: description,
            facebook: facebook,
            linkedin: linkedin,
            twitter: twitter,
            profileStatus: "complete",
          });
          res.status(200).json({ message: "successfuly created user details" });
        }
      } else {
        res.status(200).json({ message: "you are not candidate" });
      }
    } else {
      res.status(200).json({ message: "please send all detailse and token" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.fetchCandidateDetails = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const verifyTokenId = jwt.verify(token, "zxcvbnm");
      const UserDetails = await User.findById(verifyTokenId.userId);
      console.log(UserDetails);
      res.status(200).json({ message: UserDetails });
    } else {
      res.status(200).json({ message: "please send token" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
