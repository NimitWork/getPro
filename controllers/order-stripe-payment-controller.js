const Wallet = require("../model/wallet");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Order = require("../model/order");
const AddCart = require("../model/addCard");
const otpGenerator = require("otp-generator");
const Services = require("../model/services");
const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();
const stripe = Stripe(process.env.SECRET);

module.exports.orderStripe = async (req, res) => {
  try {
    console.log(req.body)
    const TotalAmount = req.body.TotalAmount;
    const checkoutObject = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Total Amount",
            },
            unit_amount: TotalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/ordersuccess?stripe=true",
      cancel_url: "http://localhost:3000/cancel",
    };

    console.log("hiiiii");
    const session = await stripe.checkout.sessions.create(checkoutObject);
    console.log(session);
    res.status(200).send({ url: session.url, id: session.id });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.orderStripeSuccess = async (req, res) => {
  try {
    if (req.body.pay_id) {
      const session = await stripe.checkout.sessions.retrieve(req.body.pay_id);
      console.log("sessionCheck", req.body);
      if (session.status === "complete") {
        const pay_id = req.body.pay_id;
        console.log("qwertyui", req.body.pay_id);
        const token = req.headers.authorization;
        const verifyTokenId = jwt.verify(token, "zxcvbnm");
        const totalAmount = session.amount_total / 100;
        const UserDetails = await User.findById(verifyTokenId.userId);
        //    ORDER PLACED
        const couponAmount = req.body.couponAmount;
        const couponName = req.body.couponName;
        let WallettransactionId = otpGenerator.generate(25, {
          upperCaseAlphabets: false,
          specialChars: false,
        });

        const walletData = new Wallet({
          user: UserDetails.email,
          wallet: totalAmount,
          datetime: new Date().toLocaleString(),
          pay_type: "Stripe",
          pay_id: pay_id,
          pay_transaction: "debited",
          transactionId: WallettransactionId,
        });
        await walletData.save();
        let CartData = await AddCart.find({ custemerId: UserDetails.email });

        let arr = [];
        for (let i = 0; i < CartData.length; i++) {
          const element = CartData[i];
          const FindProduct = await Services.findById(element.productId);
          let obj = {
            id: FindProduct.id,
            p_title: FindProduct.title,
            p_shortTitle: FindProduct.shortTitle,
            p_dec: FindProduct.dec,
            p_price: FindProduct.price,
            p_quantity: element.quantity,
          };

          arr.push(obj);
        }

        let orderNo ;
        var Order_id = await Order.find().sort({ $natural: -1 }).limit(1)
        if(Order_id.length<1){
         orderNo =1
        }else{
         orderNo = Order_id[0].order_id +1
        }

        const orderPlaced = new Order({
          transactionId: WallettransactionId,
          pay_id: pay_id,
          pay_method: "Stripe",
          type: "Ordered",
          email: UserDetails.email,
          datetime: new Date().toLocaleString(),
          totalAmount: totalAmount,
          CouponName: couponName,
          couponAmount: couponAmount,
          products: arr,
          status: "success",
          order_id:orderNo,
          is_order:"true"
        });
       const orderData= await orderPlaced.save();
        // DELETE CART OF USER

        for (let i = 0; i < CartData.length; i++) {
          const id = CartData[i]._id;
          await AddCart.findByIdAndDelete(id);
        }
        res.status(200).json({
          data: "order Placed",
          message:orderData

        });
      } else {
        res.status(200).json({
          data: "payment failed",
        });
      }
    } else {
      res.status(200).json({
        data: "please send paymentId",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

module.exports.PendingPaymentStripe = async (req, res) => {
  try {
    console.log(req.body);
    const TotalAmount = req.body.totalAmount;
    console.log(TotalAmount);
    const checkoutObject = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Total Amount",
            },
            unit_amount: parseInt(TotalAmount) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/PendingPaymentStripeSuccess",
      cancel_url: "http://localhost:3000/cancel",
    };
    const session = await stripe.checkout.sessions.create(checkoutObject);
    console.log(session);
    res.status(200).send({ url: session.url, id: session.id });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.PendingPaymentStripeSuccess = async (req, res) => {
  try {
    console.log("PendingPaymentStripeSuccess======", req.body);
    if (req.body.pay_id && req.body.orderId) {
      const session = await stripe.checkout.sessions.retrieve(req.body.pay_id);
      const wallet = session.amount_total / 100;
      console.log("sessionCheck", session);
      if (session.status === "complete") {
        const updateOrderDetails = await Order.findByIdAndUpdate(
          req.body.orderId,
          {
            pay_id: req.body.pay_id,
            pay_method: "Stripe",
            status: "success",
            totalAmount: wallet,
          }
        );
        const findWalletTransaction = await Wallet.findOne({
          transactionId: updateOrderDetails.transactionId,
        });
        console.log("ffiffff", findWalletTransaction);
        await Wallet.findByIdAndUpdate(findWalletTransaction._id, {
          pay_id: req.body.pay_id,
          pay_type: "Stripe",
          wallet: wallet,
        });
        res.status(200).json({
          message: "payment Successfull",
        });
      } else {
        res.status(200).json({
          message: "Payment failed",
        });
      }
    } else {
      res.status(200).json({ message: "please send pay_id and order id" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
