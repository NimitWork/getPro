const User = require("../model/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Postjob = require("../model/postJob");
const CompanyDetails = require("../model/companyDetails");
const HireCandidate = require("../model/hireCandidate");

module.exports.HireCandidate = async (req, res) => {
  try {
    console.log(req.body);
    const token = req.headers.authorization;
    const candidateId = req.body.hireId;
    const candidateDetails = await User.findById(candidateId);
    if (token) {
      const verifyTokenId = jwt.verify(token, "zxcvbnm");
      const UserDetails = await User.findById(verifyTokenId.userId);
      //  console.log(UserDetails);

      // FIND COMPANY

      const findCompany = await CompanyDetails.find({
        email: UserDetails.email,
      });
      console.log("findCompany", findCompany);

      const checkHireCandidate = await HireCandidate.find({
        candidateDetails: candidateDetails._id,
        employerId: findCompany[0].email,
      });
      console.log("checkHireCandidate", checkHireCandidate);

      if (checkHireCandidate.length < 1) {
        const insertHireCandidate = new HireCandidate({
          candidateDetails: candidateDetails._id,
          employerId: findCompany[0].email,
        });
        await insertHireCandidate.save();

        //  SEND EMAIL TO CANDIDATE

        const mailTransporter = nodemailer.createTransport({
          host: `smtp.gmail.com`,
          port: 465,
          secure: true,
          auth: {
            user: "bablusaini90310@gmail.com",
            pass: "zeczopkmiqbvbffc",
          },
        });
        let mailDetails = {
          from: "bablusaini90310@gmail.com",
          to: `${candidateDetails.email}`,
          subject: "Hired",
          html: `

<!doctype html>
<html lang="en">
<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">


<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<title>Hello, world!</title>
<style>
.background{

}
</style>
</head>

<body>
<div style="width:450px">
<label style="background:#03979c;display:block;text-align:center;color:white;padding:80px 0px">
<h1 style="margin:0;">
Invitation From ${findCompany[0].companyName}
</h1>
<p style="margin:0;font-size:14px;">User Details</p>
</label>
<label style="width:100%;display:block;background:#ebebeb;padding:14px;box-sizing:border-box;font-size:14px">
 <a href="">View Company Details</a>
</label>
</div> 
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>
`,
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ message: "Hire Successfull" });
          }
        });
      } else {
        //  SEND EMAIL TO CANDIDATE

        const mailTransporter = nodemailer.createTransport({
          host: `smtp.gmail.com`,
          port: 465,
          secure: true,
          auth: {
            user: "bablusaini90310@gmail.com",
            pass: "zeczopkmiqbvbffc",
          },
        });
        let mailDetails = {
          from: "bablusaini90310@gmail.com",
          to: `${candidateDetails.email}`,
          subject: "Hired",
          html: `
      
      <!doctype html>
      <html lang="en">
      <head>
      
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      
      
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      
      <title>Hello, world!</title>
      <style>
      .background{
      
      }
      </style>
      </head>
      
      <body>
      <div style="width:450px">
      <label style="background:#03979c;display:block;text-align:center;color:white;padding:80px 0px">
      <h1 style="margin:0;">
      Invitation From ${findCompany[0].companyName}
      </h1>
      <p style="margin:0;font-size:14px;">User Details</p>
      </label>
      <label style="width:100%;display:block;background:#ebebeb;padding:14px;box-sizing:border-box;font-size:14px">
       <a href="">View Company Details</a>
      </label>
      </div> 
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
      </body>
      </html>
      `,
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({
              message: "Hire Successfull",
            });
          }
        });
      }
    } else {
      res.status(200).json({ message: "please send token" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.getHireCandidate = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const verifyTokenId = jwt.verify(token, "zxcvbnm");
      const UserDetails = await User.findById(verifyTokenId.userId);
      console.log(UserDetails);
      const findCompany = await CompanyDetails.find({
        email: UserDetails.email,
      });
      console.log("findCompany", findCompany);

      const checkHireCandidate = await HireCandidate.find({
        employerId: findCompany[0].email,
      }).populate("candidateDetails");
      console.log("checkHireCandidate", checkHireCandidate);
      res.status(200).json({ message: checkHireCandidate });
    } else {
      res.status(200).json({ message: "please send token" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
