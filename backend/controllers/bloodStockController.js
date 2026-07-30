const BloodStock = require("../models/bloodStockModel");

// Get All Blood Stock
exports.getAllBloodStock = (req, res) => {
    BloodStock.getAll((err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error fetching blood stock",
                error: err
            });
        }

        res.status(200).json(results);
    });
};

// Get Blood Stock By ID
exports.getBloodStockById = (req, res) => {
    const id = req.params.id;

    BloodStock.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error fetching blood stock",
                error: err
            });
        }

        res.status(200).json(results[0]);
    });
};

// Add Blood Stock
exports.addBloodStock = (req, res) => {

    console.log("Incoming Blood Stock:", req.body);

    BloodStock.create(req.body, (err, result) => {

        if (err) {

            console.error("MYSQL ERROR:", err);

            return res.status(500).json({
                success: false,
                message: err.sqlMessage || err.message,
                code: err.code,
                errno: err.errno
            });

        }

        console.log("Insert Success:", result);

        res.status(201).json({
            success: true,
            message: "Blood Stock Added Successfully"
        });

    });

};

// Update Blood Stock
exports.updateBloodStock = (req, res) => {
    const id = req.params.id;

    BloodStock.update(id, req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error updating blood stock",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Blood Stock Updated Successfully"
        });

    });
};

// Delete Blood Stock
exports.deleteBloodStock = (req, res) => {
    const id = req.params.id;

    BloodStock.delete(id, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error deleting blood stock",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Blood Stock Deleted Successfully"
        });

    });
};