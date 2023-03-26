const companyDetailsRouter = require('express').Router()
const companyDetailsController = require("../controllers/company-details-controller")


companyDetailsRouter
    .route('/companyDetails')
    .get(companyDetailsController.fetchCompanyDetails)
    .post(companyDetailsController.InsertCompanyDetails)
    
companyDetailsRouter
.route('/fetchAllompanyDetails')
.get(companyDetailsController.fetchAllCompanyDetails)

   
    

module.exports=companyDetailsRouter