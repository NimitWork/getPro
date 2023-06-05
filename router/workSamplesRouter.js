
const workSampleRouter = require('express').Router()
const workSamplesController = require("../controllers/workSamples-controller")


workSampleRouter
    .route('/getworkSamples')
    .get(workSamplesController.getworkSample);

module.exports=workSampleRouter

