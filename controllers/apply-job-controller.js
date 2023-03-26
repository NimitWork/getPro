const User = require("../model/user");
const jwt = require("jsonwebtoken");
const Postjob = require("../model/postJob");
const Applyjob = require("../model/applyjob");

const nodemailer = require("nodemailer");
module.exports.applyJob = async (req, res) => {
  try {
    console.log(req.body);
    const token = req.headers.authorization;
    if (token) {
      const verifyTokenId = jwt.verify(token, "zxcvbnm");
      const UserDetails = await User.findById(verifyTokenId.userId);
      console.log(UserDetails);
      if (UserDetails.accountType === "candidate") {
        // FIND JOB APPLY

        let findApplyJob = await Applyjob.find({
          email: UserDetails.email,
          jobId: req.body.jobId,
        }).populate("jobId");
        console.log("findApplyJob", findApplyJob);
        if (findApplyJob.length < 1) {
          const applyJob = new Applyjob({
            email: UserDetails.email,
            jobId: req.body.jobId,
          });
          await applyJob.save();

          // FIND JOB DETAILS

          const jobDetails = await Postjob.findById(req.body.jobId);
          console.log("jobDetails", jobDetails);

          //  SEND EMAIL TO EMPLOYER

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
            to: `${jobDetails.email}`,
            subject: "Job Applied",
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
 Job Applied For ${jobDetails.jobtitle}
  </h1>
  <p style="margin:0;font-size:14px;">User Details</p>
</label>
<label style="width:100%;display:block;background:#ebebeb;padding:14px;box-sizing:border-box;font-size:14px">
   <p style="margin-top:0"> username :<b style="margin-left:40px">${UserDetails.username}</b></p>

    <p> email :<b style="margin-left:40px">${UserDetails.email}</b></p>
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
                message: "mail have sent successfully",
              });
            }
          });

          res.status(200).json({ message: "job applyed" });
        } else {
          //  SEND EMAIL TO EMPLOYER

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
            to: `${findApplyJob[0].jobId.email}`,
            subject: "Test mail",
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
 Job Applied For ${findApplyJob[0].jobId.jobtitle}
  </h1>
  <p style="margin:0;font-size:14px;">User Details</p>
</label>
<label style="width:100%;display:block;background:#ebebeb;padding:14px;box-sizing:border-box;font-size:14px">
   <p style="margin-top:0"> username :<b style="margin-left:40px">${UserDetails.username}</b></p>

    <p> email :<b style="margin-left:40px">${UserDetails.email}</b></p>
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
                message: "mail have sent successfully",
              });
            }
          });

          res.status(200).json({ message: "job applyed" });
        }
      } else {
        res.status(200).json({ message: "you are not candidate" });
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

module.exports.getApplyJob = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const verifyTokenId = jwt.verify(token, "zxcvbnm");
      const UserDetails = await User.findById(verifyTokenId.userId);
      console.log(UserDetails);
      if (UserDetails.accountType === "candidate") {
        const JobData = await Applyjob.find({
          email: UserDetails.email,
        }).populate("jobId");
        res.status(200).json({ message: JobData });
      } else {
        res.status(200).json({ message: "you are not candidate" });
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
