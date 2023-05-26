const authorsRouter = require('express').Router()
const authorsController = require("../controllers/authors-controller")


authorsRouter
    .route('/getAuthor/:id')
    .get(authorsController.getAuthor);
    authorsRouter
    .route('/getAuthors')
    .get(authorsController.getAuthors);

module.exports=authorsRouter