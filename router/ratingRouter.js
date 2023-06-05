const ratingRouter = require("express").Router();
const ratingController = require("../controllers/rating-controller");

ratingRouter
  .route("/rating")
  .post(ratingController.rating);
ratingRouter
  .route("/getAllRating")
  .get(ratingController.getAllrating);
  
module.exports = ratingRouter;
