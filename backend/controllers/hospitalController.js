const Hospital = require("../models/hospitalModel");

// ==============================
// Get All Hospitals
// ==============================
exports.getAllHospitals = (req, res) => {

    Hospital.getAll((err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error fetching hospitals",
                error: err
            });
        }

        res.status(200).json(results);

    });

};

// ==============================
// Get Hospital By ID
// ==============================
exports.getHospitalById = (req, res) => {

    const id = req.params.id;

    Hospital.getById(id, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error fetching hospital",
                error: err
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found"
            });
        }

        res.status(200).json(results[0]);

    });

};

// ==============================
// Add Hospital
// ==============================
exports.addHospital = (req, res) => {

    Hospital.create(req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error adding hospital",
                error: err
            });
        }

        res.status(201).json({
            success: true,
            message: "Hospital Added Successfully"
        });

    });

};

// ==============================
// Update Hospital
// ==============================
exports.updateHospital = (req, res) => {

    const id = req.params.id;

    Hospital.update(id, req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error updating hospital",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Hospital Updated Successfully"
        });

    });

};

// ==============================
// Delete Hospital
// ==============================
exports.deleteHospital = (req, res) => {

    const id = req.params.id;

    Hospital.delete(id, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error deleting hospital",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Hospital Deleted Successfully"
        });

    });

};