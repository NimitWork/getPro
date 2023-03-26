const CreateResumeRouter = require("express").Router();
const CreateResumeController = require("../controllers/create-resume-controller");

CreateResumeRouter.route("/createResume").post(
  CreateResumeController.CreateResume
);
CreateResumeRouter.route("/findResume").get(CreateResumeController.FindResume);

CreateResumeRouter.route("/findUserResume/:id").get(
  CreateResumeController.FindUserResume
);
module.exports = CreateResumeRouter;
