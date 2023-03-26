const hireCandidateRouter = require("express").Router();
const hireCandidateController = require("../controllers/hire-candidate-controller");

hireCandidateRouter
  .route("/hireCandidate")
  .post(hireCandidateController.HireCandidate);
hireCandidateRouter
  .route("/gethireCandidate")
  .get(hireCandidateController.getHireCandidate);

module.exports = hireCandidateRouter;
