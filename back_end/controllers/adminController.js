const Feedback = require("../models/Feedback");
const MedicalShop = require("../models/MedicalShop");
const Medicine = require("../models/Medicine");
const Order = require("../models/Order");
const User = require("../models/User");

async function getSummary(req, res, next) {
  try {
    const [users, shops, medicines, orders, feedback] = await Promise.all([
      User.countDocuments(),
      MedicalShop.countDocuments(),
      Medicine.countDocuments(),
      Order.countDocuments(),
      Feedback.countDocuments(),
    ]);
    return res.json({ users, shops, medicines, orders, feedback });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getSummary };
