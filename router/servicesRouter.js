const servicesRouter = require('express').Router()
const servicesController = require("../controllers/services-controller")


servicesRouter
    .route('/getServices')
    .get(servicesController.getServices);

module.exports=servicesRouter