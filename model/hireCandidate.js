const mongoose = require("mongoose");
const hireCandidate = mongoose.Schema({
  candidateDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  employerId: {
    type: String,
  },
});

module.exports = mongoose.model("hireCandidate", hireCandidate);
