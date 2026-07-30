const db = require("../config/database");

const Donor = {

    // Get All Donors
    getAll: (callback) => {
        db.query("SELECT * FROM donors ORDER BY id DESC", callback);
    },

    // Get Donor By ID
    getById: (id, callback) => {
        db.query("SELECT * FROM donors WHERE id = ?", [id], callback);
    },

    // Create Donor
    create: (donor, callback) => {

        const sql = `
            INSERT INTO donors
            (name, age, gender, blood_group, phone, address, last_donation)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            donor.name,
            donor.age,
            donor.gender,
            donor.blood_group,
            donor.phone,
            donor.address,
            donor.last_donation || null
        ], callback);

    },

    // Update Donor
    update: (id, donor, callback) => {

        const sql = `
            UPDATE donors
            SET
                name = ?,
                age = ?,
                gender = ?,
                blood_group = ?,
                phone = ?,
                address = ?,
                last_donation = ?
            WHERE id = ?
        `;

        db.query(sql, [
            donor.name,
            donor.age,
            donor.gender,
            donor.blood_group,
            donor.phone,
            donor.address,
            donor.last_donation || null,
            id
        ], callback);

    },

    // Delete Donor
    delete: (id, callback) => {
        db.query("DELETE FROM donors WHERE id = ?", [id], callback);
    }

};

module.exports = Donor;