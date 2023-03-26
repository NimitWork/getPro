const User = require("../model/user");
const PostJob = require("../model/postJob");
const CompanyDetails = require("../model/companyDetails");
const jwt = require("jsonwebtoken");

module.exports.postJob = async (req, res) => {
    try {
        const jobtitle = req.body.jobtitle
        const jobcategory = req.body.jobcategory
        const jobtype = req.body.jobtype
        const offeredsalary = req.body.offeredsalary
        const experience = req.body.experience
        const qualification = req.body.qualification
        const gender = req.body.gender
        const country = req.body.country
        const city = req.body.city
        const location = req.body.location
        const latitude = req.body.latitude
        const logitude = req.body.logitude
        const websiteUrl = req.body.websiteUrl
        const EstSince = req.body.EstSince
        const completeAddress = req.body.completeAddress
        const description = req.body.websiteUrl
        const startDate = req.body.startDate
        const EndDate = req.body.startDate
        // const companyDetails=req.body.companyDetails
        const token = req.headers.authorization
        console.log(token)
        const verifyTokenId = jwt.verify(token, "zxcvbnm");
        const UserDetails = await User.findById(verifyTokenId.userId)
        console.log(UserDetails)
        const companyDetails = await CompanyDetails.find({ email: UserDetails.email })
        if (companyDetails.length > 0) {
            const jobDetails = {
                jobtitle: jobtitle,
                jobcategory: jobcategory,
                jobtype: jobtype,
                offeredsalary: offeredsalary,
                experience: experience,
                qualification: qualification,
                gender: gender,
                country: country,
                city: city,
                email: UserDetails.email,
                location: location,
                latitude: latitude,
                logitude: logitude,
                websiteUrl: websiteUrl,
                EstSince: EstSince,
                completeAddress: completeAddress,
                description: description,
                startDate: startDate,
                EndDate: EndDate,
                companyDetails: companyDetails._id

            }
            const saveJobDetails = new PostJob(jobDetails)
            await saveJobDetails.save()
            res.status(200).json({message:"job posted"})
        } else {
            res.status(200).json({ message: "please make you company profile" })
        }


    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};


module.exports.getJob = async (req, res) => {
    try {
        const token = req.headers.authorization
        console.log(token)
        const verifyTokenId = jwt.verify(token, "zxcvbnm");
        const UserDetails = await User.findById(verifyTokenId.userId)
        console.log(UserDetails)
     const getJob=await PostJob.find({email:UserDetails.email})
     res.status(200).json({message:getJob})
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

  module.exports.getAllJob = async (req, res) => {
    try {   
     const getAllJob=await PostJob.find()
     res.status(200).json({message:getAllJob})
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };