const careerRouter = require('express').Router()
const careerController = require("../controllers/career-controller")


careerRouter
    .route('/getcareers')
    .get(careerController.getCareers)

module.exports=careerRouter