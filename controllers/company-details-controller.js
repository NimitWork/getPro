const User = require("../model/user");
const CompanyDetails = require("../model/companyDetails");
const jwt = require("jsonwebtoken");

module.exports.InsertCompanyDetails = async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(req.body);
    if (token && req.body) {
      const verifyTokenId = jwt.verify(token, "zxcvbnm");
      const UserDetails = await User.findById(verifyTokenId.userId);
      const companyName = req.body.companyName;
      const phone = req.body.phone;
      const companyEmail = req.body.companyEmail;
      const websiteUrl = req.body.websiteUrl;
      const country = req.body.country;
      const city = req.body.city;
      const pincode = req.body.pincode;
      const address = req.body.address;
      const description = req.body.description;
      const facebook = req.body.facebook;
      const linkdin = req.body.linkedin;
      const twitter = req.body.twitter;
      const findCompany = await CompanyDetails.find({
        email: UserDetails.email,
      });
      if (findCompany.length < 1) {
        const companyDetails = new CompanyDetails({
          email: UserDetails.email,
          companyEmail: companyEmail,
          phone: phone,
          companyName: companyName,
          websiteUrl: websiteUrl,
          country: country,
          city: city,
          pincode: pincode,
          address: address,
          description: description,
          facebook: facebook,
          linkdin: linkdin,
          twitter: twitter,
        });
        await companyDetails.save();
        res
          .status(200)
          .json({ message: "successfuly created company details" });
      } else {
        res.status(200).json({ message: "your company is already registered" });
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

module.exports.fetchCompanyDetails = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const verifyTokenId = jwt.verify(token, "zxcvbnm");
      const UserDetails = await User.findById(verifyTokenId.userId);
      console.log(UserDetails);
      const companyDetails = await CompanyDetails.find({
        email: UserDetails.email,
      });
      res.status(200).json({ message: companyDetails });
    } else {
      res.status(200).json({ message: "please send token" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.fetchAllCompanyDetails = async (req, res) => {
  try {
    const companyDetails = await CompanyDetails.find();
    res.status(200).json({ message: companyDetails });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
