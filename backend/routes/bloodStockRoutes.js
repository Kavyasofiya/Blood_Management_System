const express = require("express");
const router = express.Router();

const bloodStockController = require("../controllers/bloodStockController");

// Get all blood stock
router.get("/", bloodStockController.getAllBloodStock);

// Get blood stock by ID
router.get("/:id", bloodStockController.getBloodStockById);

// Add blood stock
router.post("/", bloodStockController.addBloodStock);

// Update blood stock
router.put("/:id", bloodStockController.updateBloodStock);

// Delete blood stock
router.delete("/:id", bloodStockController.deleteBloodStock);

module.exports = router;