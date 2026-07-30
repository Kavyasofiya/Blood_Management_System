const express = require("express");
const router = express.Router();

const bloodRequestController = require("../controllers/bloodRequestController");

// Get all requests
router.get("/", bloodRequestController.getAllRequests);

// Get request by ID
router.get("/:id", bloodRequestController.getRequestById);

// Add request
router.post("/", bloodRequestController.addRequest);

// Update request
router.put("/:id", bloodRequestController.updateRequest);

// Delete request
router.delete("/:id", bloodRequestController.deleteRequest);

module.exports = router;