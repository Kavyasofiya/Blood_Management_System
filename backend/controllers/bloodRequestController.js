const BloodRequest = require("../models/bloodRequestModel");

// Get All Requests
exports.getAllRequests = (req, res) => {

    BloodRequest.getAll((err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error fetching requests",
                error: err
            });
        }

        res.status(200).json(results);

    });

};

// Get Request By ID
exports.getRequestById = (req, res) => {

    const id = req.params.id;

    BloodRequest.getById(id, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error fetching request",
                error: err
            });
        }

        res.status(200).json(results[0]);

    });

};

// Add Request
exports.addRequest = (req, res) => {

    console.log("========== NEW REQUEST ==========");
    console.log(req.body);

    BloodRequest.create(req.body, (err, result) => {

        if (err) {

            console.log("MYSQL ERROR");
            console.log(err);

            return res.status(500).json({
                success: false,
                message: err.sqlMessage,
                code: err.code
            });

        }

        console.log(result);

        res.json({
            success: true,
            message: "Blood Request Added Successfully"
        });

    });

};
// Update Request
exports.updateRequest = (req, res) => {

    const id = req.params.id;

    BloodRequest.update(id, req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error updating request",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Blood Request Updated Successfully"
        });

    });

};

// Delete Request
exports.deleteRequest = (req, res) => {

    const id = req.params.id;

    BloodRequest.delete(id, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error deleting request",
                error: err
            });
        }

        res.json( {
            success: true,
            message: "Blood Request Deleted Successfully"
        });

    });

};