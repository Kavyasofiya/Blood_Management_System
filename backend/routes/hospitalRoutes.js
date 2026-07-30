const express = require("express");
const router = express.Router();

const hospitalController = require("../controllers/hospitalController");

// Test Route
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Hospital Route Working"
    });
});

// Get All Hospitals
router.get("/", hospitalController.getAllHospitals);

// Get Hospital By ID
router.get("/:id", hospitalController.getHospitalById);

// Add Hospital
router.post("/", hospitalController.addHospital);

// Update Hospital
router.put("/:id", hospitalController.updateHospital);

// Delete Hospital
router.delete("/:id", hospitalController.deleteHospital);

module.exports = router;