const mongoose = require("mongoose");
const companyDetails = mongoose.Schema({
  email: String,
  companyEmail:String,
  phone:Number,
  companyName:String,
  websiteUrl:String,
  country:String,
  city:String,
  pincode:Number,
  address:String,
  description:String,
  facebook:String,
  linkedin:String,
  twitter:String
 

});

module.exports = mongoose.model("companyDetails", companyDetails);