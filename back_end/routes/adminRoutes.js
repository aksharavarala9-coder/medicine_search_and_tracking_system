const express = require("express");
const { getSummary } = require("../controllers/adminController");
const authenticate = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authenticate, allowRoles("admin"));
router.get("/summary", getSummary);

module.exports = router;
