const expertLevelRouter = require('express').Router()
const expertLevelController = require("../controllers/expert-level-controller")

expertLevelRouter
    .route('/getAllExpertLevel')
    .get(expertLevelController.getAllExpertLevel)


module.exports=expertLevelRouter