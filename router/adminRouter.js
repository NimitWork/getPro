const adminRouter = require("express").Router();
const adminController = require("../controllers/admin-controller");
const authController = require("../controllers/auth-controller");

adminRouter.route("/getproadmin").get(adminController.adminLogin);
adminRouter.route("/adminLogin").post(adminController.adminLoginSubmit);
adminRouter
  .route("/dashboard")
  .get(authController.checkLogin, adminController.dashboard);
adminRouter
  .route("/users")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.users
  );
adminRouter
  .route("/updateUser/:id")
  .get(authController.checkLogin, adminController.updateUser)
  .post(adminController.updateUserSubmit);
adminRouter
  .route("/delete/:id")
  .get(authController.checkLogin, adminController.deleteteUser);
adminRouter
  .route("/query")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.query
  );
adminRouter.route("/contact-us").post(adminController.queryAdd);
adminRouter
  .route("/workSample")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.worksample
  );
adminRouter
  .route("/workSampleReadMore/:id")
  .get(authController.checkLogin, adminController.workSampleReadMore);
adminRouter
  .route("/addworksample")
  .get(authController.checkLogin, adminController.addworksample)
  .post(
    adminController.upload.fields([{ name: "img" }, { name: "pdf" }]),
    adminController.addworksampleSubmit
  );
adminRouter
  .route("/updateworksample/:id")
  .get(authController.checkLogin, adminController.updateworksample)
  .post(
    adminController.upload.fields([{ name: "img" }, { name: "pdf" }]),
    adminController.updateworksampleSubmit
  );
adminRouter
  .route("/deleteworksample/:id")
  .get(authController.checkLogin, adminController.deleteworksampleSubmit);
adminRouter
  .route("/authors")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.authors
  );
adminRouter
  .route("/authoreReadMore/:id")
  .get(authController.checkLogin, adminController.AuthorReadMore);
adminRouter
  .route("/addAuthors")
  .get(authController.checkLogin, adminController.addAuthors)
  .post(
    adminController.upload.fields([{ name: "img" }, { name: "pdf" }]),
    adminController.addAuthorsSubmit
  );
adminRouter
  .route("/updateAuthors/:id")
  .get(authController.checkLogin, adminController.updateAuthors)
  .post(
    adminController.upload.fields([{ name: "img" }, { name: "pdf" }]),
    adminController.updateAuthorsSubmit
  );
adminRouter
  .route("/deleteAuthors/:id")
  .get(authController.checkLogin, adminController.deleteAuthor);
adminRouter
  .route("/faqs")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.faqs
  );
adminRouter
  .route("/faqReadMore/:id")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.FaqReadMore
  );
adminRouter
  .route("/addFaqs")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.addFaqs
  )
  .post(adminController.addFaqsSubmit);
adminRouter
  .route("/updateFaqs/:id")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.updateFaqs
  )
  .post(adminController.updateFaqsSubmit);
adminRouter
  .route("/deleteFaqs/:id")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.deleteFaqs
  );

adminRouter
  .route("/blog")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.blog
  );
adminRouter
  .route("/blogReadMore/:id")
  .get(authController.checkLogin, adminController.BlogReadMore);
adminRouter
  .route("/addblog")
  .get(authController.checkLogin, adminController.addblog)
  .post(
    adminController.upload.fields([{ name: "img" }, { name: "pdf" }]),
    adminController.addblogSubmit
  );
adminRouter
  .route("/updateblog/:id")
  .get(authController.checkLogin, adminController.updateBLog)
  .post(
    adminController.upload.fields([{ name: "img" }, { name: "pdf" }]),
    adminController.updateBLogSubmit
  );
adminRouter
  .route("/deleteBlog/:id")
  .get(authController.checkLogin, adminController.deleteBlog);

adminRouter
  .route("/logout")
  .get(authController.checkLogin, adminController.logout);
adminRouter
  .route("/services")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.services
  );
adminRouter
  .route("/servicesReadMore/:id")
  .get(authController.checkLogin, adminController.servicesReadMore);
adminRouter
  .route("/addservices")
  .get(authController.checkLogin, adminController.addServices)
  .post(adminController.addServicesSubmit);
adminRouter
  .route("/updateservices/:id")
  .get(authController.checkLogin, adminController.updateServices)
  .post(adminController.updateServicesSubmit);
adminRouter
  .route("/deleteServices/:id")
  .get(authController.checkLogin, adminController.deleteServices);

adminRouter
  .route("/coupon")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.coupon
  );
adminRouter
  .route("/addcoupon")
  .get(authController.checkLogin, adminController.addcoupon)
  .post(adminController.addCouponSubmit);
adminRouter
  .route("/updateCoupon/:id")
  .get(authController.checkLogin, adminController.updateCoupon)
  .post(adminController.updateCouponSubmit);
adminRouter
  .route("/deleteCoupon/:id")
  .get(authController.checkLogin, adminController.deleteCoupon);
adminRouter
  .route("/career")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.career
  );
adminRouter
  .route("/addcareer")
  .get(authController.checkLogin, adminController.addCareer)
  .post(adminController.addCareerSubmit);
adminRouter
  .route("/updateCareer/:id")
  .get(authController.checkLogin, adminController.updateCareer)
  .post(adminController.updateCareerSubmit);
adminRouter
  .route("/deleteCareer/:id")
  .get(authController.checkLogin, adminController.deleteCareer);
adminRouter
  .route("/chats")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.chats
  );
adminRouter
  .route("/adminWalletHistory")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.adminWalletTransactionHistory
  );
adminRouter
  .route("/adminOrderHistory")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.adminOrderHistory
  );
adminRouter
  .route("/viewOrderDetails/:id")
  .get(authController.checkLogin, adminController.viewOrderDetails);
adminRouter
  .route("/findupdatemessage/:id")
  .get(authController.checkLogin, adminController.findupdatemessage);
adminRouter
  .route("/edit-message/:id")
  .post(authController.checkLogin, adminController.findupdatemessagesubmit);
adminRouter
  .route("/extraCredit")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.extraCredit
  );
adminRouter
  .route("/AddextraCredit")
  .get(authController.checkLogin, adminController.AddextraCredit);
adminRouter
  .route("/AddextraCrsedit")
  .post(authController.checkLogin, adminController.AddextraCreditSubmit);
adminRouter
  .route("/editExtraCredit/:id")
  .get(authController.checkLogin, adminController.editExtraCredit);
adminRouter
  .route("/editExtraCredit/:id")
  .post(authController.checkLogin, adminController.editExtraCreditSubmit);
adminRouter
  .route("/getOrderDetailsInChat/:id")
  .get(authController.checkLogin, adminController.getOrderDetailsInChat);
adminRouter
  .route("/contentType")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.contentType
  );
adminRouter
  .route("/addcontentType")
  .get(authController.checkLogin, adminController.AddContentType);
adminRouter
  .route("/addContentTypeSubmit")
  .post(authController.checkLogin, adminController.AddContentTypeSubmit);
adminRouter
  .route("/deleteContentType/:id")
  .get(authController.checkLogin, adminController.DeleteContentType);
adminRouter
  .route("/expertLevel")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.expertLevel
  );
adminRouter
  .route("/addexpertLevel")
  .get(authController.checkLogin, adminController.AddExpertLevel);
adminRouter
  .route("/addexpertLevelSubmit")
  .post(authController.checkLogin, adminController.AddExpertLevelSubmit);
adminRouter
  .route("/updateExpertLevel/:id")
  .get(authController.checkLogin, adminController.updateExpertLevel);
adminRouter
  .route("/updateExpertLevelSubmit/:id")
  .post(authController.checkLogin, adminController.updateExpertLevelSubmit);
adminRouter
  .route("/updateContentType/:id")
  .get(authController.checkLogin, adminController.updateContentType);
adminRouter
  .route("/updateContentTypeSubmit/:id")
  .post(authController.checkLogin, adminController.updateContentTypeSubmit);
adminRouter
  .route("/deleteExpertLevel/:id")
  .get(authController.checkLogin, adminController.DeleteExpertLevelSubmit);
adminRouter
  .route("/addPermission")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.AddPermission
  );
adminRouter
  .route("/addPermissionSubmit")
  .post(authController.checkLogin, adminController.AddPermissionSubmit);
adminRouter
  .route("/role")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.role
  );
adminRouter
  .route("/addRole")
  .get(authController.checkLogin, adminController.addRole);
adminRouter
  .route("/addRoleSubmit")
  .post(authController.checkLogin, adminController.addRoleSubmit);
adminRouter
  .route("/subAdmin")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.SubAdmin
  );
adminRouter
  .route("/addSubAdmin")
  .get(authController.checkLogin, adminController.AddSubAdmin);
adminRouter
  .route("/addSubAdminSubmit")
  .post(authController.checkLogin, adminController.AddSubAdminSubmit);
adminRouter
  .route("/editPermissions/:id")
  .get(authController.checkLogin, adminController.editPermissions)
  .post(authController.checkLogin, adminController.editPermissionsSubmit);
adminRouter
  .route("/reviews")
  .get(
    authController.checkLogin,
    authController.checkFaq,
    adminController.reviews
  );
adminRouter
  .route("/acceptReview/:id")
  .get(authController.checkLogin, adminController.AcceptReviews);
adminRouter
  .route("/reviewDelete/:id")
  .get(authController.checkLogin, adminController.reviewDelete);
adminRouter
  .route("/reviewReadMore/:id")
  .get(authController.checkLogin, adminController.reviewReadMore);
adminRouter
  .route("/pageNotFound")
  .get(authController.checkLogin, adminController.pageNotFound);
adminRouter.route("/getChatSubAdmin").get(adminController.getChatSubAdmin);
adminRouter.route("/deleteQuery/:id").get(adminController.QueryDelete);

adminRouter.route("/prices").get(adminController.price);
adminRouter.route("/pricesEdit/:id").get(adminController.priceEdit);
adminRouter.route("/pricesEdit/:id").post(adminController.priceEditSubmit);
adminRouter.route("/getAllPrices").get(adminController.getAllPrices);

module.exports = adminRouter;
