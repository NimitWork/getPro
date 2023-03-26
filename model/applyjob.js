const mongoose = require("mongoose");
const applyJob = mongoose.Schema({
  email: {
    type: String,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Postjob",
  },
});

module.exports = mongoose.model("applyJob", applyJob);
