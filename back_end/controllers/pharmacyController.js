const MedicalShop = require("../models/MedicalShop");
const Medicine = require("../models/Medicine");

async function searchMedicines(req, res, next) {
  try {
    const filter = {};
    if (typeof req.query.search === "string" && req.query.search.trim()) {
      filter.name = { $regex: req.query.search.trim(), $options: "i" };
    }
    if (typeof req.query.shop === "string" && req.query.shop) {
      filter.shop = req.query.shop;
    }

    const medicines = await Medicine.find(filter)
      .populate("shop", "name address phone")
      .sort({ name: 1 })
      .limit(50);
    return res.json({ medicines });
  } catch (error) {
    return next(error);
  }
}

async function getShops(req, res, next) {
  try {
    const shops = await MedicalShop.find().select("name address phone").sort({ name: 1 });
    return res.json({ shops });
  } catch (error) {
    return next(error);
  }
}

async function addMedicine(req, res, next) {
  try {
    const { name, description, price, stock, shop } = req.body;
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);
    if (
      !name?.trim() ||
      !shop ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0 ||
      !Number.isInteger(parsedStock) ||
      parsedStock < 0
    ) {
      return res.status(400).json({ message: "A medicine name, valid price, and shop are required." });
    }
    const medicalShop = await MedicalShop.findById(shop);
    if (!medicalShop) {
      return res.status(404).json({ message: "The selected pharmacy could not be found." });
    }
    if (req.user.role !== "admin" && medicalShop.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only manage medicines for your pharmacy." });
    }
    const medicine = await Medicine.create({
      name: name.trim(),
      description,
      price: parsedPrice,
      stock: parsedStock,
      shop: medicalShop.id,
    });
    return res.status(201).json({ medicine });
  } catch (error) {
    return next(error);
  }
}

module.exports = { searchMedicines, getShops, addMedicine };
