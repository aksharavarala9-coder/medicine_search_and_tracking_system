const Order = require("../models/Order");

async function getProfile(req, res, next) {
  try {
    return res.json({
      user: { id: req.user.id, role: req.user.role },
    });
  } catch (error) {
    return next(error);
  }
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("shop", "name address")
      .populate("items.medicine", "name");
    return res.json({ orders });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getProfile, getOrders };
