const express = require("express");
const { getOrders, getProfile } = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.get("/me", getProfile);
router.get("/orders", getOrders);

module.exports = router;
