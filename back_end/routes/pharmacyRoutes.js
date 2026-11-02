const express = require("express");
const {
  addMedicine,
  getShops,
  searchMedicines,
} = require("../controllers/pharmacyController");
const authenticate = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/medicines", searchMedicines);
router.get("/shops", getShops);
router.post("/medicines", authenticate, allowRoles("pharmacy", "admin"), addMedicine);

module.exports = router;
