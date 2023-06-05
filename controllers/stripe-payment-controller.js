const Stripe = require("stripe");
const dotenv = require("dotenv");
const Wallet = require("../model/wallet");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const Services = require("../model/services");
const Order = require("../model/order");
const ExtraCredit = require("../model/extraCredit");
dotenv.config();
const stripe = Stripe(process.env.SECRET);

const TriggerNotification = require("../configs/triggerNotification");
const ejs = require('ejs');

const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

module.exports.CancelStripeSubcription = async (req, res) => {
  try {
    //  console.log(req.body);
    if (req.body.sub_id) {
      if (req.body.mainOrderId) {
        if (req.body.pay_method === "Stripe") {
          const deleted = await stripe.subscriptions.del(req.body.sub_id);
          await Order.findByIdAndUpdate(req.body.mainOrderId, {
            sub_status: "canceled",
          });
          // console.log(deleted);
          res.status(200).json({ message: "your subscription canceled" });
        } else if (req.body.pay_method === "RazorPay") {
          await instance.subscriptions.cancel(req.body.sub_id);
          await Order.findByIdAndUpdate(req.body.mainOrderId, {
            sub_status: "canceled",
          });
          // console.log(deleted);
          res.status(200).json({ message: "your subscription canceled" });
        }
      } else {
        res.status(500).json({ message: "please send main order id" });
      }
    } else {
      res.status(500).json({ message: "please send sub_id" });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports.payment = async (req, res) => {
  const wallet = req.body.wallet;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Wallet",
            },
            unit_amount: wallet * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/fail",
    });

    res.send(200, { url: session.url, id: session.id });
    console.log(session);
  } catch (error) {
    res.send(error);
  }
};

module.exports.rechargeWallet = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.pay_id) {
      const session = await stripe.checkout.sessions.retrieve(req.body.pay_id);
      console.log("sessionCheck", session);
      if (session.status === "complete") {
        let extraCredit = await ExtraCredit.findOne();

        const token = req.headers.authorization;
        const verifyTokenId = jwt.verify(token, "zxcvbnm");
        const UserDetails = await User.findById(verifyTokenId.userId);
        const wallet = session.amount_total / 100;
        console.log("eeeee", extraCredit);
        const pay_id = req.body.pay_id;
        let WallettransactionId = otpGenerator.generate(25, {
          upperCaseAlphabets: false,
          specialChars: false,
        });
        // console.log("LB-101 userDetails", UserDetails);

        let username = UserDetails.username || '';
        let email = UserDetails.email || '';
        let cc = '';

        //  SEND EMAIL FOR ADMIN
        subject = `Payment made for Credits`;
        emailContent = `<div style="width:100%;padding:14px;margin: auto;text-align:left">
                        <h2 style="margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#0B5394"><strong>Hi Admin,</strong></h2>
                        <p style="display:block;box-sizing:border-box;">
                        ${email} from ${UserDetails.location || ''} has made payment of ${wallet} USD for depositing Credits through stripe.. 
                        </p>
                        </div>`;
        adminRegisterTemplate = await ejs.renderFile(__dirname + '/../configs/email_template.html', emailContent);
        await TriggerNotification.triggerEMAIL(process.env.ADMIN_EMAIL, cc, subject, null, adminRegisterTemplate);

        //  EMAIL SENT TO USER
        subject = `Payment was Successful`;
        emailContent = `<div style="width:100%;padding:14px;margin: auto;text-align:left">
        <h2 style="margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#0B5394"><strong>Hi ${username},</strong></h2>
        <p style="display:block;box-sizing:border-box;">
        Your payment of ${wallet} USD was successful towards receiving credits. You can check the details of it using below link
        </p>
        <br>
        <a href="https://getprowriter.com/transactionhistory" class="es-button" target="_blank" style="font-family:arial, helvetica, sans-serif;font-size:16px;text-decoration:none;mso-style-priority:100 !important;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF; padding: 10px; border-style:solid;border-color:#049899;border-width:0px 15px;display:inline-block;background:#049899;border-radius:4px;font-weight:bold;font-style:normal;line-height:19px;width:auto;text-align:center">Credit History</a></span>
        </div>`;
        adminRegisterTemplate = await ejs.renderFile(__dirname + '/../configs/email_template.html', emailContent);
        await TriggerNotification.triggerEMAIL(email, cc, subject, null, adminRegisterTemplate);


        if (wallet >= 500) {
          let walletAmout = wallet;
          const updateWallet = await User.findByIdAndUpdate(UserDetails._id, {
            wallet: walletAmout,
          });
          const walletData = new Wallet({
            user: UserDetails.email,
            wallet: wallet + extraCredit.extraCredit,
            datetime: new Date().toLocaleString(),
            pay_type: "Stripe",
            pay_id: pay_id,
            pay_transaction: "credited",
            transactionId: WallettransactionId,
          });
          await walletData.save();



          res.status(200).json({
            data: walletData,
          });
        } else {
          const updateWallet = await User.findByIdAndUpdate(UserDetails._id, {
            wallet: UserDetails.wallet + wallet,
          });
          const walletData = new Wallet({
            user: UserDetails.email,
            wallet: wallet,
            datetime: new Date().toLocaleString(),
            pay_type: "Stripe",
            pay_id: pay_id,
            pay_transaction: "credited",
            transactionId: WallettransactionId,
          });
          await walletData.save();



          res.status(200).json({
            data: walletData,
          });
        }

      } else {
        res.status(200).json({ message: "payment failed" });
      }
    } else {
      res.status(200).json({ message: "please send pay_Id" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.stripeGuestPaymentSuccess = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.pay_id && req.body.email) {
      const session = await stripe.checkout.sessions.retrieve(req.body.pay_id);
      console.log("sessionCheck", session);
      if (session.status === "complete") {
        const pay_id = req.body.pay_id;
        const wallet = session.amount_total / 100;
        let WallettransactionId = otpGenerator.generate(25, {
          upperCaseAlphabets: false,
          specialChars: false,
        });

        const walletData = new Wallet({
          user: req.body.email,
          wallet: wallet,
          datetime: new Date().toLocaleString(),
          pay_type: "Stripe",
          pay_id: pay_id,
          pay_transaction: "credited",
          transactionId: WallettransactionId,
        });
        await walletData.save();
        res.status(200).json({
          data: walletData,
        });
      } else {
        res.status(200).json({ message: "payment failed" });
      }
    } else {
      res.status(200).json({ message: "please send pay_Id" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
