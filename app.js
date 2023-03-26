const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
// const corsOptions = {
//   server,
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };
app.use(cors());

const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, () => {
  console.log("creative database have connected to your project");
});

app.use(express.json());

const RegisterRouter = require("./router/registerRouter");
const loginRouter = require("./router/loginRouter");
const getAllUserRouter = require("./router/getAllUserRouter");
const companyDetailsRouter = require("./router/companyDetailsRouter");
const candidateDetailsRouter = require("./router/candidateDetailsRouter");
const postjobRouter = require("./router/postjobRouter");
const applyJobRouter = require("./router/applyJobRouter");
const hireCandidateRouter = require("./router/hireCandidateRouter");
const createCvRouter = require("./router/createCvRouter");
const CheckLoginRouter = require("./router/checkLoginRouter");


app.use(RegisterRouter);
app.use(loginRouter);
app.use(getAllUserRouter);
app.use(companyDetailsRouter);
app.use(candidateDetailsRouter);
app.use(postjobRouter);
app.use(applyJobRouter);
app.use(hireCandidateRouter);
app.use(createCvRouter)
app.use(CheckLoginRouter)




// let n = 5
// let str = "";

// for (let i = 1; i <= n; i++) {
 
//   for (let j = 1; j <= n-i; j++) {
//     str += " ";
//   }
//   for (let k = 1; k <= i * 2 - 1; k++) {
//     if(k===1|| k=== i * 2 - 1 || i===n){
//       str += "*";
//     }else{
//       str += " ";
//     }
   
//   }
//   str += "\n";

// }



// console.log(str)







server.listen(process.env.PORT, (req, res) => {
  console.log(`Server in running on port ${process.env.PORT}`);
});
