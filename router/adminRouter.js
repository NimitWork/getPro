const adminRouter = require('express').Router()
const User = require('../model/user')
const Query = require('../model/query')
const Worksample = require('../model/worksample')
const Authors = require('../model/authors')
const Faqs = require('../model/faqs')
const Blog = require("../model/blog")
const Services = require("../model/services")
const Admin = require("../model/admin")
const Coupon = require("../model/coupon")
const Career = require("../model/career")
const multer = require("multer")
const bcrypt = require('bcrypt');
const httpMsgs = require("http-msgs")
const jwt = require('jsonwebtoken')
const path=require('path')


const checkLogin = (req, res, next) => {
    if (req.cookies.adminToken === undefined) {
        res.redirect("/getproadmin")
    } else {
        next()
    }
}



const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/image')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname+ Date.now() + file.originalname)
    }
})

var upload = multer({
    storage: Storage,  
})

// const PdfStorage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './public/upload-pdf')
//     },
//     filename: function (req, file, callback) {
//         callback(null, Date.now() + file.originalname)
//     }
// })

// var Pdfupload = multer({
//     storage: PdfStorage,
//     limits: { fileSize: 1024 * 1024 * 1024 }
// })


const adminLogin = async (req, res) => {

    res.render('adminLogin.ejs')
}

const adminLoginSubmit = async (req, res) => {
    const reqEmail = req.body.email
    const reqPass = req.body.password
    try {
        const adminData = await Admin.findOne({ email: reqEmail })
        if (adminData !== null) {
            if (adminData.password === reqPass) {
                let Id = adminData._id
                var token = jwt.sign({ Id }, 'shhhhh');
                res.cookie('adminToken', token)
                res.redirect("/dashboard")
            } else {
                httpMsgs.send500(req, res, "your password is inccorect")
            }
        } else {
            httpMsgs.send500(req, res, "your account dose not exist")
        }

    } catch (error) {

    }

}


const dashboard = (req, res) => {

    res.render('dashboard.ejs')
}

const users = async (req, res) => {
    try {
        const userData = await User.find()
        res.render('users.ejs', { userData })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        idUserData = await User.findById(id)
        res.render("userupdate.ejs", { idUserData })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}


const updateUserSubmit = async (req, res) => {
    try {
        const newUser = req.body.username
        const newEmail = req.body.email
        const newPassword = req.body.password
        let password = await bcrypt.hash(req.body.password, 10)
        const id = req.params.id
        let existUsername = await User.findOne({ username: newUser })
        if (existUsername === null) {
            await User.findByIdAndUpdate(id, { username: newUser, password: password })
            res.redirect("/users")
        } else {
            res.status(404).json({
                message: "username is already taken"
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const deleteteUser = async (req, res) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete(id)
        res.redirect("/users")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const query = async (req, res) => {
    const queryData = await Query.find()
    res.render('query.ejs', { queryData })
}
const queryAdd = async (req, res) => {

    let fullname = req.body.fullName;
    let email = req.body.email;
    let subject = req.body.subject;
    let message = req.body.message;

    try {
        const userData = new Query({ fullName: fullname, email: email, subject: subject, message: message })
        await userData.save()
        res.status(201).json({
            data: userData
        })

    } catch (error) {
        res.json({
            error: error.message
        })
    }
};


const worksample = async (req, res) => {
    try {
        const workSampleData = await Worksample.find()
        res.render('workSample.ejs', { workSampleData })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const addworksample = (req, res) => {
    res.render('worksample-add.ejs')
}

const addworksampleSubmit = async (req, res) => {

    try {
       // const img = req.file.filename
        const title = req.body.title
        const dec = req.body.dec
        var img;
        var pdf;
       await req.files.img.forEach(element => {
            img= element.filename
        })
        await req.files.pdf.forEach(element => {
            pdf= element.filename
        })
        
     
       const workSample = new Worksample({ title: title, dec: dec, image: img ,pdf:pdf})
       await workSample.save()
        res.redirect("/workSample")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateworksample = async (req, res) => {
    const id = req.params.id
    const idData = await Worksample.findById(id)
    // const workSampleData = await Worksample.find()
    res.render('worksample-edit.ejs', { idData })
}

const updateworksampleSubmit = async (req, res) => {
    try {
        const newTitle = req.body.title
        const newDec = req.body.dec
        const newImage = req.file.filename
        const id = req.params.id
        await Worksample.findByIdAndUpdate(id, { title: newTitle, dec: newDec, image: newImage })
        res.redirect("/workSample")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}


const deleteworksampleSubmit = async (req, res) => {
    try {
        const id = req.params.id
        await Worksample.findByIdAndDelete(id)
        res.redirect("/workSample")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const authors = async (req, res) => {
    try {
        const AuthorData = await Authors.find()
        res.render("authors.ejs", { AuthorData })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addAuthors = async (req, res) => {

    try {
        res.render("authors-add.ejs")

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addAuthorsSubmit = async (req, res) => {

    try {
        const img = req.file.filename
        const title = req.body.title
        const dec = req.body.dec
        const lognDec = req.body.longDec
        const image = new Authors({ title: title, dec: dec, longDec: lognDec, image: img })
        await image.save()
        res.redirect("/authors")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateAuthors = async (req, res) => {
    try {
        const id = req.params.id
        const AuthorData = await Authors.findById(id)
        res.render("authors-edit.ejs", { AuthorData })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateAuthorsSubmit = async (req, res) => {
    try {
        const newTitle = req.body.title
        const newDec = req.body.dec
        const newlongDec = req.body.longDec
        const newImage = req.file.filename
        const id = req.params.id
        console.log(req.body, req.file.filename)
        await Authors.findByIdAndUpdate(id, { title: newTitle, dec: newDec, longDec: newlongDec, image: newImage })
        res.redirect("/authors")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}


const faqs = async (req, res) => {

    try {
        const FaqsData = await Faqs.find()
        res.render("faq.ejs", { FaqsData })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const addFaqs = async (req, res) => {

    try {

        res.render("faq-add.ejs")

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addFaqsSubmit = async (req, res) => {

    try {
        const title = req.body.title
        const dec = req.body.dec
        const FaqData = new Faqs({ title: title, dec: dec })
        await FaqData.save()
        res.redirect("/faqs")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateFaqs = async (req, res) => {

    try {
        const id = req.params.id
        const FaqsData = await Faqs.findById(id)
        res.render("faq-edit.ejs", { FaqsData })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


const updateFaqsSubmit = async (req, res) => {
    try {
        const newTitle = req.body.title
        const newDec = req.body.dec
        const id = req.params.id
        await Faqs.findByIdAndUpdate(id, { title: newTitle, dec: newDec })
        res.redirect("/faqs")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const blog = async (req, res) => {

    try {

        const BlogData = await Blog.find()
        res.render("blog.ejs", { BlogData })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addblog = async (req, res) => {

    try {
        res.render("blog-add.ejs")

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addblogSubmit = async (req, res) => {
    try {
        const Title = req.body.title
        const Dec = req.body.dec
        const Image = req.file.filename
        const Name = req.body.name
        const blogData = new Blog({ title: Title, name: Name, dec: Dec, image: Image })
        await blogData.save()
        res.redirect("/blog")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const updateBLog = async (req, res) => {
    try {
        const id = req.params.id
        const idData = await Blog.findById(id)
        res.render('blog-edit.ejs', { idData })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateBLogSubmit = async (req, res) => {
    try {
        const NewTitle = req.body.title
        const NewDec = req.body.dec
        const NewImage = req.file.filename
        const NewName = req.body.name
        const id = req.params.id
        await Blog.findByIdAndUpdate(id, { title: NewTitle, name: NewName, dec: NewDec, image: NewImage })
        res.redirect("/blog")

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}


const services = async (req, res) => {

    try {
        const servicesData = await Services.find()
        res.render('services.ejs', { servicesData })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const addServices = async (req, res) => {

    try {

        res.render("services-add.ejs")

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addServicesSubmit = async (req, res) => {

    try {
        const title = req.body.title
        const shortTitle = req.body.shortTitle
        const dec = req.body.dec
        const price = req.body.price

        const servicesData = new Services({ title: title, shortTitle: shortTitle, dec: dec, price: price })
        await servicesData.save()
        res.redirect("/services")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateServices = async (req, res) => {

    try {
        const id = req.params.id
        const servicesData = await Services.findById(id)
        console.log(servicesData)
        res.render("services-edit.ejs", { servicesData })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


const updateServicesSubmit = async (req, res) => {
    try {
        const newTitle = req.body.title
        const newShortTitle = req.body.shortTitle
        const newDec = req.body.dec
        const newPrice = req.body.price
        const id = req.params.id
        await Services.findByIdAndUpdate(id, { title: newTitle, shortTitle: newShortTitle, dec: newDec, price: newPrice })
        res.redirect("/services")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const logout = async (req, res) => {
    res.clearCookie('adminToken');
    res.redirect('/getproadmin')
}

const coupon = async (req, res) => {

    try {
        const CouponData = await Coupon.find()
        res.render("coupon.ejs", { CouponData })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addcoupon = async (req, res) => {

    try {

        res.render("coupon-add.ejs")

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addCouponSubmit = async (req, res) => {

    try {
        const couponName = req.body.couponName
        const couponType = req.body.coupontype
        const couponAmount = req.body.couponAmount
        const couponStatus = req.body.couponStatus
        const couponData = new Coupon({ couponName: couponName, couponType: couponType, offAmount: couponAmount ,status:couponStatus})
        await couponData.save()
        res.redirect("/coupon")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateCoupon = async (req, res) => {

    try {
        const id = req.params.id
        const CouponData = await Coupon.findById(id)
        res.render("Coupon-edit.ejs", { CouponData })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateCouponSubmit = async (req, res) => {
    try {
        const newcouponNamee = req.body.couponName
        const newcouponType = req.body.coupontype
        const newoffAmount = req.body.couponAmount
        const couponStatus = req.body.couponStatus
        const id = req.params.id
        await Coupon.findByIdAndUpdate(id, { couponName: newcouponNamee, couponType: newcouponType, offAmount: newoffAmount ,status:couponStatus})
        res.redirect("/coupon")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const deleteCoupon = async (req, res) => {
    try {
        const id = req.params.id
        await Coupon.findByIdAndDelete(id)
        res.redirect("/coupon")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const career = async (req, res) => {

    try {
        const CareerData = await Career.find()
        res.render("career.ejs", { CareerData })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addCareer = async (req, res) => {

    try {
        res.render("career-add.ejs")

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addCareerSubmit = async (req, res) => {

    try {
        const careerName = req.body.careerName
        const careerData = new Career({ careerName: careerName })
        await careerData.save()
        res.redirect("/career")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateCareer = async (req, res) => {

    try {
        const id = req.params.id
        const CareerData = await Career.findById(id)
        res.render("career-edit.ejs", { CareerData })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateCareerSubmit = async (req, res) => {
    try {
        const newcareerName = req.body.careerName
        const id = req.params.id
        await Career.findByIdAndUpdate(id, { careerName: newcareerName })
        res.redirect("/career")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const deleteCareer = async (req, res) => {
    try {
        const id = req.params.id
        await Career.findByIdAndDelete(id)
        res.redirect("/career")
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

// adminRouter.get('/pdf/:id', function(request, response){
//     const id= req.params.id
//     console.log(__dirname)
//     fs.readFile(tempFile, function (err,data){
//        response.contentType("application/pdf");
//        response.send(data);
//     });
//   });






adminRouter
    .route('/getproadmin')
    .get(adminLogin);
adminRouter
    .route('/adminLogin')
    .post(adminLoginSubmit);
adminRouter
    .route('/dashboard')
    .get(checkLogin, dashboard);
adminRouter
    .route('/users')
    .get(checkLogin, users);
adminRouter
    .route('/updateUser/:id')
    .get(checkLogin, updateUser)
    .post(updateUserSubmit)
adminRouter
    .route('/delete/:id')
    .get(checkLogin, deleteteUser)
adminRouter
    .route('/query')
    .get(checkLogin, query);
adminRouter
    .route('/contact-us')
    .post(queryAdd);
adminRouter
    .route('/workSample')
    .get(checkLogin, worksample);
adminRouter
    .route('/addworksample')
    .get(checkLogin, addworksample)
    .post(upload.fields([{name:'img'},{name:'pdf'}]), addworksampleSubmit)
adminRouter
    .route('/updateworksample/:id')
    .get(checkLogin, updateworksample)
    .post(upload.single('img'), updateworksampleSubmit)
adminRouter
    .route('/deleteworksample/:id')
    .get(checkLogin, deleteworksampleSubmit)
adminRouter
    .route('/authors')
    .get(checkLogin, authors)
adminRouter
    .route('/addAuthors')
    .get(checkLogin, addAuthors)
    .post(upload.single('img'), addAuthorsSubmit)
adminRouter
    .route('/updateAuthors/:id')
    .get(checkLogin, updateAuthors)
    .post(upload.single('img'), updateAuthorsSubmit)
adminRouter
    .route('/faqs')
    .get(checkLogin, faqs)
adminRouter
    .route('/addFaqs')
    .get(checkLogin, addFaqs)
    .post(addFaqsSubmit)
adminRouter
    .route('/updateFaqs/:id')
    .get(checkLogin, updateFaqs)
    .post(updateFaqsSubmit)
adminRouter
    .route('/blog')
    .get(checkLogin, blog)
adminRouter
    .route('/addblog')
    .get(checkLogin, addblog)
    .post(upload.single('img'), addblogSubmit)
adminRouter
    .route('/updateblog/:id')
    .get(checkLogin, updateBLog)
    .post(upload.single('img'), updateBLogSubmit)
adminRouter
    .route('/logout')
    .get(checkLogin, logout)
adminRouter
    .route('/services')
    .get(checkLogin, services)
adminRouter
    .route('/addservices')
    .get(checkLogin, addServices)
    .post(addServicesSubmit)
adminRouter
    .route('/updateservices/:id')
    .get(checkLogin, updateServices)
    .post(updateServicesSubmit)
adminRouter
    .route('/coupon')
    .get(checkLogin, coupon)
adminRouter
    .route('/addcoupon')
    .get(checkLogin, addcoupon)
    .post(addCouponSubmit)
adminRouter
    .route('/updateCoupon/:id')
    .get(checkLogin, updateCoupon)
    .post(updateCouponSubmit)
adminRouter
    .route('/deleteCoupon/:id')
    .get(deleteCoupon)
adminRouter
    .route('/career')
    .get(career)
adminRouter
    .route('/addcareer')
    .get(addCareer)
    .post(addCareerSubmit)
adminRouter
    .route('/updateCareer/:id')
    .get(updateCareer)
    .post(updateCareerSubmit)
adminRouter
    .route('/deleteCareer/:id')
    .get(deleteCareer)
    



module.exports = adminRouter;