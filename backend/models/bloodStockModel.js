const db = require("../config/database");

const BloodStock = {

    getAll: (callback) => {
        db.query(
            "SELECT * FROM blood_stock ORDER BY blood_group ASC",
            callback
        );
    },

    getById: (id, callback) => {
        db.query(
            "SELECT * FROM blood_stock WHERE id=?",
            [id],
            callback
        );
    },

    create: (stock, callback) => {

        const sql = `
        INSERT INTO blood_stock
        (blood_group, units, expiry_date)
        VALUES (?, ?, ?)
        `;

        db.query(sql, [
            stock.blood_group,
            stock.units,
            stock.expiry_date
        ], callback);

    },

    update: (id, stock, callback) => {

        const sql = `
        UPDATE blood_stock
        SET
        blood_group=?,
        units=?,
        expiry_date=?
        WHERE id=?
        `;

        db.query(sql, [
            stock.blood_group,
            stock.units,
            stock.expiry_date,
            id
        ], callback);

    },

    delete: (id, callback) => {
        db.query(
            "DELETE FROM blood_stock WHERE id=?",
            [id],
            callback
        );
    }

};

module.exports = BloodStock;