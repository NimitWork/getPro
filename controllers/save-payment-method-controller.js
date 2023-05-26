const User = require("../model/user");
const SavePaymentMethod = require("../model/savePaymentMethod");
const jwt = require("jsonwebtoken");

module.exports.SavePaymentMethod = async (req, res) => {
  try {
    console.log(req.body);
    const token = req.headers.authorization;
    const verifyTokenId = jwt.verify(token, "zxcvbnm");
    const UserDetails = await User.findById(verifyTokenId.userId);
    const accountHolder = req.body.accountHolder;
    const cardNumber = req.body.cardNumber;
    const mm = req.body.mm;
    const yy = req.body.yy;
    const cvv = req.body.cvv;
    const obj = {
      email: UserDetails.email,
      accountHolder: accountHolder,
      cardNumber: cardNumber,
      mm: mm,
      yy: yy,
      cvv: cvv,
    };
    console.log("tyui", obj);
    const paymentDetails = new SavePaymentMethod(obj);
    paymentDetails.save();
    res.status(200).json({ message: "Payment Detail Saved" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports.FetchPaymentMethod = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const verifyTokenId = jwt.verify(token, "zxcvbnm");
    const UserDetails = await User.findById(verifyTokenId.userId);
    const PaymentDetails = await SavePaymentMethod.find({
      email: UserDetails.email,
    });
    res.status(200).json({ message: PaymentDetails });
  } catch (error) {
    res.status(400);
    // throw new Error(error.message);
  }
};

module.exports.DeletePaymentMethod = async (req, res) => {
  try {
    const id = req.params.id;
    const PaymentDetails = await SavePaymentMethod.findByIdAndDelete(id);
    res.status(200).json({ message: "Card Deleted" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports.EditPaymentMethod = async (req, res) => {
  try {
    const accountHolder = req.body.accountHolder
    const cardNumber = req.body.cardNumber
    const cvv = req.body.cvv
    const mm = req.body.mm
    const yy = req.body.yy
    const id = req.params.id;
    const PaymentDetails = await SavePaymentMethod.findByIdAndUpdate(id, {
      accountHolder: accountHolder,
      cardNumber: cardNumber,
      mm: mm,
      yy: yy,
      cvv: cvv,
    });
    res.status(200).json({ message: "Card Updated" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
