const Donor = require("../models/donorModel");

// Get All Donors
exports.getAllDonors = (req, res) => {

    Donor.getAll((err, results) => {

        if (err) {

            console.error("========== MYSQL ERROR ==========");
            console.error(err);
            console.error("=================================");

            return res.status(500).json({
                success: false,
                message: err.sqlMessage || err.message,
                code: err.code,
                errno: err.errno
            });
        }

        res.json(results);

    });

};

// Get Donor By ID
exports.getDonorById = (req, res) => {
    const id = req.params.id;

    Donor.getById(id, (err, results) => {
        if (err) {

    console.error("MYSQL ERROR:", err);

    return res.status(500).json({
        success: false,
        message: err.sqlMessage || err.message,
        error: err
    });

}

        res.status(200).json(results[0]);
    });
};

// Add Donor
// Add Donor
exports.addDonor = (req, res) => {

    console.log("Incoming Data:", req.body);

    Donor.create(req.body, (err, result) => {

        if (err) {

            console.error("MYSQL ERROR:", err);

            return res.status(500).json({
                success: false,
                message: err.sqlMessage || err.message,
                error: err
            });

        }

        console.log("Insert Success:", result);

        res.status(201).json({
            success: true,
            message: "Donor Added Successfully"
        });

    });

};

// Update Donor
exports.updateDonor = (req, res) => {

    const id = req.params.id;

    Donor.update(id, req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error updating donor",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Donor Updated Successfully"
        });

    });

};

// Delete Donor
exports.deleteDonor = (req, res) => {

    const id = req.params.id;

    Donor.delete(id, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error deleting donor",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Donor Deleted Successfully"
        });

    });

};