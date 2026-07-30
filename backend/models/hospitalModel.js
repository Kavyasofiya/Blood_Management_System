const db = require("../config/database");

const Hospital = {

    // Get All Hospitals
    getAll: (callback) => {
        db.query(
            "SELECT * FROM hospitals ORDER BY id DESC",
            callback
        );
    },

    // Get Hospital By ID
    getById: (id, callback) => {
        db.query(
            "SELECT * FROM hospitals WHERE id = ?",
            [id],
            callback
        );
    },

    // Add Hospital
    create: (hospital, callback) => {

        const sql = `
            INSERT INTO hospitals
            (hospital_name, address, phone, email, contact_person)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sql, [

            hospital.hospital_name,
            hospital.address,
            hospital.phone,
            hospital.email || null,
            hospital.contact_person || null

        ], callback);

    },

    // Update Hospital
    update: (id, hospital, callback) => {

        const sql = `
            UPDATE hospitals
            SET
                hospital_name=?,
                address=?,
                phone=?,
                email=?,
                contact_person=?
            WHERE id=?
        `;

        db.query(sql, [

            hospital.hospital_name,
            hospital.address,
            hospital.phone,
            hospital.email || null,
            hospital.contact_person || null,
            id

        ], callback);

    },

    // Delete Hospital
    delete: (id, callback) => {

        db.query(
            "DELETE FROM hospitals WHERE id=?",
            [id],
            callback
        );

    }

};

module.exports = Hospital;