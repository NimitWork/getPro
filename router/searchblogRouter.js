const searchBlogRouter = require('express').Router()
const searchBlogController = require("../controllers/search-blog-controller")


searchBlogRouter
    .route('/searchblog')
    .post(searchBlogController.serarchBlog);

module.exports=searchBlogRouter