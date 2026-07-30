const db = require("../config/database");

const BloodRequest = {

    // Get All Requests
    getAll: (callback) => {

        db.query(
            "SELECT * FROM blood_requests ORDER BY id DESC",
            callback
        );

    },

    // Get Request By ID
    getById: (id, callback) => {

        db.query(
            "SELECT * FROM blood_requests WHERE id = ?",
            [id],
            callback
        );

    },

    // Add Request
    create: (request, callback) => {

        console.log("Request received in Model:", request);

        const sql = `
            INSERT INTO blood_requests
            (
                patient_name,
                blood_group,
                units_required,
                hospital,
                status
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                request.patient_name,
                request.blood_group,
                request.units_required,
                request.hospital,
                request.status || "Pending"
            ],
            callback
        );

    },

    // Update Request
    update: (id, request, callback) => {

        const sql = `
            UPDATE blood_requests
            SET
                patient_name = ?,
                blood_group = ?,
                units_required = ?,
                hospital = ?,
                status = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                request.patient_name,
                request.blood_group,
                request.units_required,
                request.hospital,
                request.status,
                id
            ],
            callback
        );

    },

    // Delete Request
    delete: (id, callback) => {

        db.query(
            "DELETE FROM blood_requests WHERE id = ?",
            [id],
            callback
        );

    }

};

module.exports = BloodRequest;