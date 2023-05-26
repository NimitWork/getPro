const blogRouter = require('express').Router()
const blogController = require("../controllers/blog-controller")


blogRouter
    .route('/getBlog')
    .get(blogController.getBlog);
blogRouter
    .route('/readmoreblog/:id')
    .get(blogController.readMoreBlog);
module.exports=blogRouter