const express = require("express");
const router = express.Router();

const donorController = require("../controllers/donorController");

// Get all donors
router.get("/", donorController.getAllDonors);

// Get donor by ID
router.get("/:id", donorController.getDonorById);

// Add donor
router.post("/", donorController.addDonor);

// Update donor
router.put("/:id", donorController.updateDonor);

// Delete donor
router.delete("/:id", donorController.deleteDonor);

module.exports = router;