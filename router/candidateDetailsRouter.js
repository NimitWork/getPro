const candidateDetailsRouter = require("express").Router();
const candidatesDetailsController = require("../controllers/candidates-details");

candidateDetailsRouter
  .route("/canditateDetails")
  .get(candidatesDetailsController.fetchCandidateDetails)
  .post(
    candidatesDetailsController.upload.single("avatar"),
    candidatesDetailsController.InsertCandidateDetails
  );

// userDetailsRouter
// .route('/fetchAllompanyDetails')
// .get(companyDetailsController.fetchAllCompanyDetails)

module.exports = candidateDetailsRouter;
