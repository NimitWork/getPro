const mongoose = require("mongoose")
const Postjob = mongoose.Schema({
  jobtitle: String,
  jobcategory: String,
  jobtype: String,
  offeredsalary: Number,
  experience: Number,
  qualification: String,
  gender: String,
  country: String,
  city: String,
  email: String,
  location: String,
  latitude: String,
  logitude: String,
  websiteUrl: String,
  EstSince: String,
  completeAddress: String,
  description: String,
  startDate: String,
  EndDate: String,
  companyDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companyDetails",
  },
});

module.exports = mongoose.model("Postjob", Postjob);