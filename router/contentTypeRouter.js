const contentTypeRouter = require('express').Router()
const contentTypeController = require("../controllers/content-type-controller")

contentTypeRouter
    .route('/getAllContentType')
    .get(contentTypeController.getAllExpertLevel)


module.exports=contentTypeRouter