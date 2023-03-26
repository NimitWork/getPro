const User = require("../model/user");
const Query = require("../model/query");
const Worksample = require("../model/worksample");
const Authors = require("../model/authors");
const Faqs = require("../model/faqs");
const Blog = require("../model/blog");
const Services = require("../model/services");
const Admin = require("../model/admin");
const Coupon = require("../model/coupon");
const Career = require("../model/career");
const Wallet = require("../model/wallet");
const Order = require("../model/order");
const multer = require("multer");
const bcrypt = require("bcrypt");
const httpMsgs = require("http-msgs");
const jwt = require("jsonwebtoken");
const path = require("path");
const Message = require("../model/messageModel");
const Chat = require("../model/chatModel");
const ExtraCredit = require("../model/extraCredit");
const ContentType = require("../model/contentType");
const ExpertLevel = require("../model/expertLevel");
const Permission = require("../model/permission");
const Role = require("../model/role");
const Rating = require("../model/rating");

const moment = require("moment");
const fs = require("fs");
const json = require("../public/json.json");

module.exports.checkRole = async (req, res, next) => {
  if (req.cookies.adminToken === undefined) {
    res.redirect("/getproadmin");
  } else {
    next();
    // let token = req.cookies.adminToken
    // const verifyTokenId = jwt.verify(token, "zxcvbnm");
    // const UserDetails = await User.findById(verifyTokenId.userId);
    // if (UserDetails.role === "admin") {
    //   next();
    // } else {
    //   res.send("you are not authrized")
    // }
  }
};

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let a = file.originalname;
    let extname = path.extname(a);
    if (extname === ".jpg" || extname === ".png") {
      callback(null, "./public/image");
    } else if (extname === ".pdf") {
      callback(null, "./public/upload-pdf");
    }
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + Date.now() + file.originalname);
  },
});

module.exports.upload = multer({
  storage: Storage,
});
module.exports.adminLogin = async (req, res) => {
  res.render("adminLogin.ejs");
};

module.exports.adminLoginSubmit = async (req, res) => {
  const reqEmail = req.body.email;
  const reqPass = req.body.password;
  try {
    const adminData = await User.findOne({ email: reqEmail });

    if (adminData !== null) {
      let bcryptMatchPassword = await bcrypt.compare(
        req.body.password,
        adminData.password
      );
      console.log(bcryptMatchPassword);
      if (bcryptMatchPassword === true) {
        if (adminData.type == "admin") {
          let userId = adminData._id;
          var token = jwt.sign({ userId }, "zxcvbnm");
          //console.log("token")
          res.cookie("adminToken", token);
          res.json({
            message: "successfully login",
            token: token,
          });
        } else {
          httpMsgs.send500(req, res, "you are user so you can't login");
        }
      } else {
        httpMsgs.send500(req, res, "your password is inccorect");
      }
    } else {
      httpMsgs.send500(req, res, "your account dose not exist");
    }
  } catch (error) {}
};

module.exports.dashboard = (req, res) => {
  res.render("dashboard.ejs");
};

module.exports.users = async (req, res) => {
  try {
    // const abc=await User.findOne()
    // console.log( moment(abc.datetime).format(
    //   " DD MMM YYYY, ddd, HH:mm:ss "
    // ))
    const data = await User.find().sort();
    let userData = data.reverse();
    res.render("users.ejs", { userData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    idUserData = await User.findById(id);
    res.render("userupdate.ejs", { idUserData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateUserSubmit = async (req, res) => {
  try {
    const newUser = req.body.username;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    let password = await bcrypt.hash(req.body.password, 10);
    const id = req.params.id;
    let existUsername = await User.findOne({ username: newUser });
    if (existUsername === null) {
      await User.findByIdAndUpdate(id, {
        username: newUser,
        password: password,
      });
      res.redirect("/users");
    } else {
      httpMsgs.send500(req, res, "username is already exist");
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.redirect("/users");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.query = async (req, res) => {
  const data = await Query.find().sort();
  const queryData = data.reverse();
  res.render("query.ejs", { queryData });
};
module.exports.queryAdd = async (req, res) => {
  let fullname = req.body.fullName;
  let email = req.body.email;
  let subject = req.body.subject;
  let message = req.body.message;

  try {
    const userData = new Query({
      fullName: fullname,
      email: email,
      subject: subject,
      message: message,
    });
    await userData.save();
    res.status(201).json({
      data: userData,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports.worksample = async (req, res) => {
  try {
    const data = await Worksample.find().sort();
    const workSampleData = data.reverse();
    // for (let i = 0; i < workSampleData.length; i++) {
    //   const element = workSampleData[i].dec;
    //   console.log(element.substr(5,10))
    //  }
    res.render("workSample.ejs", { workSampleData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.workSampleReadMore = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Worksample.findById(id);
    res.render("workSampleReadMore.ejs", { data });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addworksample = (req, res) => {
  res.render("worksample-add.ejs");
};

module.exports.addworksampleSubmit = async (req, res) => {
  try {
    // const img = req.file.filename
    const title = req.body.title;
    const dec = req.body.dec;
    var img;
    var pdf;
    await req.files.img.forEach((element) => {
      img = element.filename;
    });
    await req.files.pdf.forEach((element) => {
      pdf = element.filename;
    });

    const workSample = new Worksample({
      title: title,
      dec: dec,
      image: img,
      pdf: pdf,
    });
    await workSample.save();
    res.redirect("/workSample");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateworksample = async (req, res) => {
  const id = req.params.id;
  const idData = await Worksample.findById(id);
  // const workSampleData = await Worksample.find()
  res.render("worksample-edit.ejs", { idData });
};

module.exports.updateworksampleSubmit = async (req, res) => {
  try {
    const newTitle = req.body.title;
    const newDec = req.body.dec;
    const id = req.params.id;
    var img;
    var pdf;
    if (req.files.img) {
      await req.files.img.forEach((element) => {
        img = element.filename;
      });
      await Worksample.findByIdAndUpdate(id, {
        title: newTitle,
        dec: newDec,
        image: img,
      });
      res.redirect("/workSample");
    } else if (req.files.pdf) {
      await req.files.pdf.forEach((element) => {
        pdf = element.filename;
      });
      await Worksample.findByIdAndUpdate(id, {
        title: newTitle,
        dec: newDec,
        pdf: pdf,
      });
      res.redirect("/workSample");
    } else {
      await Worksample.findByIdAndUpdate(id, {
        title: newTitle,
        dec: newDec,
      });
      res.redirect("/workSample");
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteworksampleSubmit = async (req, res) => {
  try {
    const id = req.params.id;
    await Worksample.findByIdAndDelete(id);
    res.redirect("/workSample");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.authors = async (req, res) => {
  try {
    const data = await Authors.find().sort();
    const AuthorData = data.reverse();
    res.render("authors.ejs", { AuthorData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.AuthorReadMore = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Authors.findById(id);
    res.render("authorReadMore.ejs", { data });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addAuthors = async (req, res) => {
  try {
    res.render("authors-add.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addAuthorsSubmit = async (req, res) => {
  try {
    const title = req.body.title;
    const dec = req.body.dec;
    const lognDec = req.body.longDec;
    var img;
    var pdf;
    await req.files.img.forEach((element) => {
      img = element.filename;
    });
    const auther = new Authors({
      title: title,
      dec: dec,
      longDec: lognDec,
      image: img,
    });
    await auther.save();
    res.redirect("/authors");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateAuthors = async (req, res) => {
  try {
    const id = req.params.id;
    const AuthorData = await Authors.findById(id);

    res.render("authors-edit.ejs", { AuthorData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateAuthorsSubmit = async (req, res) => {
  try {
    const newTitle = req.body.title;
    const newDec = req.body.dec;
    const newlongDec = req.body.longDec;
    var img;
    var pdf;
    const id = req.params.id;
    if (req.files.img) {
      await req.files.img.forEach((element) => {
        img = element.filename;
      });
      await Authors.findByIdAndUpdate(id, {
        title: newTitle,
        dec: newDec,
        longDec: newlongDec,
        image: img,
      });
      res.redirect("/authors");
    } else {
      await Authors.findByIdAndUpdate(id, {
        title: newTitle,
        dec: newDec,
        longDec: newlongDec,
      });
      res.redirect("/authors");
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    await Authors.findByIdAndDelete(id);
    res.redirect("/authors");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.faqs = async (req, res) => {
  try {
    const data = await Faqs.find().sort();
    const FaqsData = data.reverse();
    res.render("faq.ejs", { FaqsData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.FaqReadMore = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Faqs.findById(id);
    res.render("faqReadMore.ejs", { data });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addFaqs = async (req, res) => {
  try {
    res.render("faq-add.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addFaqsSubmit = async (req, res) => {
  try {
    const title = req.body.title;
    const dec = req.body.dec;
    const FaqData = new Faqs({ title: title, dec: dec });
    await FaqData.save();
    res.redirect("/faqs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports.updateFaqs = async (req, res) => {
  try {
    const id = req.params.id;
    const FaqsData = await Faqs.findById(id);
    res.render("faq-edit.ejs", { FaqsData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateFaqsSubmit = async (req, res) => {
  try {
    const newTitle = req.body.title;
    const newDec = req.body.dec;
    const id = req.params.id;
    await Faqs.findByIdAndUpdate(id, { title: newTitle, dec: newDec });
    res.redirect("/faqs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteFaqs = async (req, res) => {
  try {
    const id = req.params.id;
    await Faqs.findByIdAndDelete(id);
    res.redirect("/faqs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.blog = async (req, res) => {
  try {
    const data = await Blog.find().sort();
    const BlogData = data.reverse();
    res.render("blog.ejs", { BlogData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.BlogReadMore = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Blog.findById(id);
    res.render("blogReadMore.ejs", { data });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addblog = async (req, res) => {
  try {
    res.render("blog-add.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addblogSubmit = async (req, res) => {
  try {
    const Title = req.body.title;
    const Dec = req.body.dec;
    const Name = req.body.name;
    var img;
    var pdf;
    await req.files.img.forEach((element) => {
      img = element.filename;
    });
    const blogData = new Blog({
      title: Title,
      name: Name,
      dec: Dec,
      image: img,
      pdf: pdf,
    });
    await blogData.save();
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateBLog = async (req, res) => {
  try {
    const id = req.params.id;
    const idData = await Blog.findById(id);
    res.render("blog-edit.ejs", { idData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateBLogSubmit = async (req, res) => {
  try {
    const NewTitle = req.body.title;
    const NewDec = req.body.dec;
    const NewName = req.body.name;
    const id = req.params.id;
    var img;
    var pdf;

    if (req.files.img) {
      await req.files.img.forEach((element) => {
        img = element.filename;
      });
      await Blog.findByIdAndUpdate(id, {
        title: NewTitle,
        name: NewName,
        dec: NewDec,
        image: img,
      });
      res.redirect("/blog");
    } else {
      await Blog.findByIdAndUpdate(id, {
        title: NewTitle,
        name: NewName,
        dec: NewDec,
      });
      res.redirect("/blog");
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.services = async (req, res) => {
  try {
    const data = await Services.find().sort();
    const servicesData = data.reverse();
    res.render("services.ejs", { servicesData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.servicesReadMore = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Services.findById(id);
    res.render("servicesReadMore.ejs", { data });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addServices = async (req, res) => {
  try {
    res.render("services-add.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addServicesSubmit = async (req, res) => {
  try {
    const title = req.body.title;
    const shortTitle = req.body.shortTitle;
    const dec = req.body.dec;
    const price = req.body.price;

    const servicesData = new Services({
      title: title,
      shortTitle: shortTitle,
      dec: dec,
      price: price,
    });
    await servicesData.save();
    res.redirect("/services");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports.updateServices = async (req, res) => {
  try {
    const id = req.params.id;
    const servicesData = await Services.findById(id);
    res.render("services-edit.ejs", { servicesData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateServicesSubmit = async (req, res) => {
  try {
    const newTitle = req.body.title;
    const newShortTitle = req.body.shortTitle;
    const newDec = req.body.dec;
    const newPrice = req.body.price;
    const id = req.params.id;
    await Services.findByIdAndUpdate(id, {
      title: newTitle,
      shortTitle: newShortTitle,
      dec: newDec,
      price: newPrice,
    });
    res.redirect("/services");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteServices = async (req, res) => {
  try {
    const id = req.params.id;
    await Services.findByIdAndDelete(id);
    res.redirect("/services");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("adminToken");
  res.redirect("/getproadmin");
};

module.exports.coupon = async (req, res) => {
  try {
    const data = await Coupon.find().sort();
    const CouponData = data.reverse();
    res.render("coupon.ejs", { CouponData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addcoupon = async (req, res) => {
  try {
    res.render("coupon-add.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addCouponSubmit = async (req, res) => {
  try {
    const couponName = req.body.couponName;
    const couponType = req.body.couponType;
    const couponAmount = req.body.couponAmount;
    const couponStatus = req.body.couponStatus;
    console.log(req.body);
    const CouponData = await Coupon.findOne({ couponName: couponName });
    if (CouponData == null) {
      const couponData = new Coupon({
        couponName: couponName,
        couponType: couponType,
        offAmount: couponAmount,
        status: couponStatus,
      });
      await couponData.save();
      res.redirect("/coupon");
    } else {
      httpMsgs.send500(req, res, "coupon name is already exist");
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateCoupon = async (req, res) => {
  try {
    const id = req.params.id;
    const CouponData = await Coupon.findById(id);
    res.render("coupon-edit.ejs", { CouponData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateCouponSubmit = async (req, res) => {
  try {
    const newcouponNamee = req.body.couponName;
    const newcouponType = req.body.coupontype;
    const newoffAmount = req.body.couponAmount;
    const couponStatus = req.body.couponStatus;
    const id = req.params.id;
    const CouponData = await Coupon.findOne({ couponName: newcouponNamee });
    if (CouponData == null) {
      await Coupon.findByIdAndUpdate(id, {
        couponName: newcouponNamee,
        couponType: newcouponType,
        offAmount: newoffAmount,
        status: couponStatus,
      });
      res.redirect("/coupon");
    } else {
      httpMsgs.send500(req, res, "coupon name is already exist");
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteCoupon = async (req, res) => {
  try {
    const id = req.params.id;
    await Coupon.findByIdAndDelete(id);
    res.redirect("/coupon");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.career = async (req, res) => {
  try {
    const data = await Career.find().sort();
    const CareerData = data.reverse();
    res.render("career.ejs", { CareerData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addCareer = async (req, res) => {
  try {
    res.render("career-add.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addCareerSubmit = async (req, res) => {
  try {
    const careerName = req.body.careerName;
    const careerData = new Career({ careerName: careerName });
    await careerData.save();
    res.redirect("/career");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateCareer = async (req, res) => {
  try {
    const id = req.params.id;
    const CareerData = await Career.findById(id);
    res.render("career-edit.ejs", { CareerData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateCareerSubmit = async (req, res) => {
  try {
    const newcareerName = req.body.careerName;
    const id = req.params.id;
    await Career.findByIdAndUpdate(id, { careerName: newcareerName });
    res.redirect("/career");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteCareer = async (req, res) => {
  try {
    const id = req.params.id;
    await Career.findByIdAndDelete(id);
    res.redirect("/career");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.chats = async (req, res) => {
  try {
    res.render("chats.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.adminWalletTransactionHistory = async (req, res) => {
  try {
    const creditHistory = await Wallet.find({ pay_transaction: "credited" });
    const debitHistory = await Wallet.find({ pay_transaction: "debited" });
    // console.log(creditHistory)
    res.render("wallethistory.ejs", { creditHistory, debitHistory });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.adminOrderHistory = async (req, res) => {
  try {
    const data = await Order.find().sort();
    const OrderHistory = data.reverse();
    res.render("orderHistory.ejs", { OrderHistory });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.viewOrderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    let OrderData = await Order.findById(id);
    console.log(OrderData);
    let Products = OrderData.products;
    res.render("viewOrderDetails.ejs", { OrderData, Products });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports.findupdatemessage = async (req, res) => {
  try {
    const id = req.params.id;
    let messageData = await Message.findById(id);
    //s console.log(messageData);
    res.status(200).json({ message: messageData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.findupdatemessagesubmit = async (req, res) => {
  try {
    const id = req.params.id;
    const new_message = req.body.newMessage;
    let messageData = await Message.findByIdAndUpdate(id, {
      content: new_message,
    });
    res.status(200).json({ message: messageData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.extraCredit = async (req, res) => {
  try {
    let data = await ExtraCredit.find().sort();
    const extraCreditData = data.reverse();
    res.render("extraCredit.ejs", { extraCreditData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports.AddextraCredit = async (req, res) => {
  try {
    res.render("extra-credit-add.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.AddextraCreditSubmit = async (req, res) => {
  try {
    const message = req.body.message;
    const credit = req.body.credit;
    let extraCredit = new ExtraCredit({
      message: message,
      extraCredit: credit,
    });
    await extraCredit.save();
    res.redirect("/extraCredit");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.editExtraCredit = async (req, res) => {
  try {
    const id = req.params.id;
    let CreditData = await ExtraCredit.findById(id);
    res.render("extra-credit-edit.ejs", { CreditData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports.editExtraCreditSubmit = async (req, res) => {
  try {
    const id = req.params.id;
    const NewMessage = req.body.message;
    const credit = req.body.credit;
    console.log(req.body);
    let CreditData = await ExtraCredit.findByIdAndUpdate(id, {
      message: NewMessage,
      extraCredit: credit,
    });
    res.redirect("/extraCredit");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.getOrderDetailsInChat = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const ChatData = await Chat.findById(id);

    const OrderData = await Order.findById(ChatData.orderId);
    res.status(200).json({ message: OrderData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports.contentType = async (req, res) => {
  try {
    const data = await ContentType.find().sort();
    const contentTypeData = data.reverse();
    res.render("content-type.ejs", { contentTypeData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.AddContentType = async (req, res) => {
  try {
    res.render("content-type-add.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports.AddContentTypeSubmit = async (req, res) => {
  try {
    // console.log(req.body)
    const ContentName = req.body.ContentName;
    const contentTypeData = new ContentType({ contentType: ContentName });
    await contentTypeData.save();
    res.redirect("/contentType");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateContentType = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ContentType.findById(id);
    res.render("edit-content-type.ejs", { data });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateContentTypeSubmit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ContentType.findByIdAndUpdate(id, {
      contentType: req.body.contentType,
    });
    res.redirect("/contentType");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.DeleteContentType = async (req, res) => {
  try {
    const Contentid = req.params.id;
    console.log(Contentid);
    const contentTypeData = await ContentType.findByIdAndDelete(Contentid);
    res.redirect("/contentType");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.expertLevel = async (req, res) => {
  try {
    const data = await ExpertLevel.find().sort();
    const ExpertLevelData = data.reverse();
    res.render("expert-level.ejs", { ExpertLevelData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.AddExpertLevel = async (req, res) => {
  try {
    res.render("expert-level-add.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.AddExpertLevelSubmit = async (req, res) => {
  try {
    const expertLevel = req.body.expertLevel;
    const expertlevelData = new ExpertLevel({ expertLevel: expertLevel });
    await expertlevelData.save();
    res.redirect("/expertLevel");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateExpertLevel = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ExpertLevel.findById(id);
    res.render("edit-expert-level.ejs", { data });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateExpertLevelSubmit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ExpertLevel.findByIdAndUpdate(id, {
      expertLevel: req.body.expertLevel,
    });
    res.redirect("/expertLevel");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.DeleteExpertLevelSubmit = async (req, res) => {
  try {
    const id = req.params.id;
    const expertlevelData = await ExpertLevel.findByIdAndDelete(id);
    res.redirect("/expertLevel");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.AddPermission = async (req, res) => {
  try {
    res.render("permission-add.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports.AddPermissionSubmit = async (req, res) => {
  try {
    const permission = req.body.permission;
    const permissionData = new Permission({ permission: permission });
    await permissionData.save();
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.role = async (req, res) => {
  try {
    const roleData = await Role.find().populate("permissions");
    console.log(roleData);
    res.render("role.ejs", { roleData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addRole = async (req, res) => {
  try {
    res.render("role-add.ejs", { PermissionData: json.pages });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addRoleSubmit = async (req, res) => {
  try {
    console.log(req.body);
    const role = req.body.role;
    const permission = req.body.permission;

    const RoleData = new Role({ role: role, permissions: permission });
    await RoleData.save();
    res.redirect("/role");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.editPermissions = async (req, res) => {
  try {
    const roleData = await Role.findById(req.params.id).populate("permissions");
    console.log(roleData);
    res.render("role-edit.ejs", {
      PermissionData: json.pages,
      roleData: roleData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.editPermissionsSubmit = async (req, res) => {
  try {
    console.log("===================", req.body, req.params.id);
    const id = req.params.id;
    const newPermissions = req.body.permissions;
    const UpdateNewPermission = await Role.findByIdAndUpdate(id, {
      permissions: newPermissions,
    });
    res.redirect("/role");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.SubAdmin = async (req, res) => {
  try {
    const adminData = await User.find({ type: "admin" }).populate("role");
    console.log(adminData);
    const filterAdmin = await adminData.filter(
      (item, index) => item.email !== "getproadmin000@gmail.com"
    );
    res.render("subAdmin.ejs", { filterAdmin });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.AddSubAdmin = async (req, res) => {
  try {
    const roleData = await Role.find();
    console.log(roleData);
    res.render("add-sub-admin.ejs", { roleData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.AddSubAdminSubmit = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const bycrptPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      username: username,
      email: email,
      password: bycrptPassword,
      status: "active",
      role: role,
      type: "admin",
    });
    await userData.save();
    res.redirect("/subAdmin");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.reviews = async (req, res) => {
  try {
    const data = await Rating.find().sort();
    const reviewData = data.reverse();
    console.log(reviewData);
    res.render("review.ejs", { reviewData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.AcceptReviews = async (req, res) => {
  try {
    const id = req.params.id;
    const reviewUpdate = await Rating.findByIdAndUpdate(id, { status: "read" });
    res.redirect("/reviews");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.reviewDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const reviewUpdate = await Rating.findByIdAndDelete(id);
    res.redirect("/reviews");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.reviewReadMore = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Rating.findById(id);
    res.render("reviewReadMore.ejs", { data });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.pageNotFound = async (req, res) => {
  try {
    res.render("page-not-found");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
