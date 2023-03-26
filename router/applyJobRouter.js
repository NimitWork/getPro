const applyJobRouter = require("express").Router();
const applyJobController = require("../controllers/apply-job-controller");

applyJobRouter.route("/applyJob").post(applyJobController.applyJob);
applyJobRouter.route("/getapplyJob").get(applyJobController.getApplyJob);


module.exports = applyJobRouter;
